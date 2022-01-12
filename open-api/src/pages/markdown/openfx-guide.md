

[old document ](https://keti-openfx.readthedocs.io/en/latest/index.html)

# 1. Ubuntu server setting

## 0. (재설치 시) remove all settings

```bash
#master
kubectl drain {노드이름} --delete-local-data --force --ignore-daemonsets
kubectl delete node {노드이름}

kubeadm reset

#work01, work02
kubeadm reset

# on debian base
sudo apt-get purge kubeadm kubectl kubelet kubernetes-cni kube*

sudo apt-get autoremove

sudo rm -rf ~/.kube
```

## 1. Install Docker

```bash
sudo apt update
sudo apt install docker.io
sudo systemctl start docker
sudo systemctl enable docker

#daemon.json 생성 필요
참고 >> https://kubernetes.io/docs/setup/production-environment/container-runtimes/#docker

sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 2. Install Kubernetes

```bash
sudo apt install apt-transport-https curl

curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add
sudo apt-add-repository "deb http://apt.kubernetes.io/ kubernetes-xenial main"

sudo apt install kubeadm kubelet kubectl kubernetes-cni
sudo apt-mark hold kubeadm kubelet kubectl kubernetes-cni

sudo swapoff -a
```

## 3. set hostnames

```bash
#check hostname
hostname -i
sudo vi /etc/hosts

sudo hostnamectl set-hostname kubernetes-master

#check hostname
hostnamectl
```

## 4. networking plugins

```bash
https://github.com/containernetworking/plugins

./build_linux.sh
```

## 5. Kubernetes master node

```bash

kubeadm config images pull

#kubeadm init

kubeadm init --pod-network-cidr=10.244.0.0/16 --apiserver-advertise-address=<host ip>

>>>  kubeadm join <host ip>:6443 --token sg#.#### \
	--discovery-token-ca-cert-hash sha256:4ca7####

mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

```

## 6. Kubernetes deploy a pods network

```bash
kubectl -n kube-system edit configmap coredns
>> `loop` 삭제

kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/k8s-manifests/kube-flannel-rbac.yml

sudo systemctl restart kubelet
```

## 7. Kubernetes Node setting

```bash
# on node server에서 명령어 실행
# 위에서 kubeadm init~~ 명령어 실행 후 콘솔에 나오는 정보
kubeadm join <host ip>:6443 --token sg#.#### \
	--discovery-token-ca-cert-hash sha256:4ca7####

## 만약 token정보를 잃어버렸을 경우
kubeadm token list

openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | openssl rsa -pubin -outform der 2>/dev/null | openssl dgst -sha256 -hex | sed 's/^.* //'

```

## 8. Docker - local registry

1)create local registry

```bash
docker run -d -p 5000:5000 --restart=always --name registry registry:2

#check
curl -k -X GET https://<host ip>:<PORT>/v2/_catalog
curl -X GET http://211.232.115.85:5000/v2/_catalog
```

2) vi /etc/docker/daemon.json

```bash
// json안에 추가 필요
"insecure-registries" : ["211.232.115.85:5000"]

//json 없다면
{
   "insecure-registries" : ["211.232.115.85:5000"]
}

// 수정 후 docker 재시작
systemctl restart docker
```

## 99. Troubleshootings

### 1)

```bash
E: Could not get lock /var/lib/dpkg/lock-frontend - open (11: Resource temporarily unavailable)
E: Unable to acquire the dpkg frontend lock (/var/lib/dpkg/lock-frontend), is another process using it?



위 에러를 아래와 같이 해결했습니다.

우선 터미널 여시고 모든 프로세스를 죽여줍니다~!
1) sudo killall apt apt-get

만일 진행중인 프로세스가 없다라고 뜨면, 아래와 같이 하나하나씩 디렉토리를 삭제해주세요.

- sudo rm /var/lib/apt/lists/lock
- sudo rm /var/cache/apt/archives/lock
- sudo rm /var/lib/dpkg/lock*

sudo dpkg --configure -a  를 하시고 sudo apt update
```

### 2)  make push 후 하단과 같은 에러가 발생한다면 docker registry port 등록 필요함

```bash
Step 14/14 : CMD ["./fxgateway"]
 ---> Running in 3df730154fab
Removing intermediate container 3df730154fab
 ---> 781f4b441f5c
Successfully built 781f4b441f5c
Successfully tagged 211.232.115.85:5000/fxgateway:2.0
docker push 211.232.115.85:5000/fxgateway:2.0
The push refers to repository [211.232.115.85:5000/fxgateway]
Get http://211.232.115.85:5000/v2/: dial tcp 211.232.115.85:5000: connect: connection refused
Makefile:15: recipe for target 'push' failed
make: *** [push] Error 1

>>> 위의 8. Docker - local registry 확인.
```

### 3) k8s node : NotReady → Ready

```bash
# troubleshooting 01 : Status NotReady
kubectl describe nodes
# => hostname별 message 확인
# Ready            False   Fri, 06 Aug 2021 15:02:44 +0900   Thu, 05 Aug 2021 15:03:54 +0900   KubeletNotReady              container runtime network not ready: NetworkReady=false reason:NetworkPluginNotReady message:docker: network plugin is not ready: cni config uninitialized

# 아래 명령어 순서대로 실행
kubectl -n kube-system delete daemonset kube-flannel-ds
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml

systemctl restart kubelet

kubectl get nodes
```

### 4) coredns status : CrashLoopBackOff

```bash
$ kubectl -n kube-system edit configmap coredns
 -> loof 삭제 또는 주석처리

$ kubectl -n kube-system delete pod -l k8s-app=kube-dns
```

### 5) kube-flannel-ds : ERROR

```bash

# 방법1)
kubeadm init시  --pod-network-cidr, --apiserver-advertise-address 두 파라미터를 "꼭" 넣어준다.
AWS CNI 문제일 가능성이 있음.

kubectl -n kube-system delete daemonset kube-flannel-ds
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml

systemctl restart kubelet

# 방법2) https://programmerall.com/article/6158199174/
kubectl -n kube-system edit daemonset kube-flannel-ds
hostNetwork, containsers.command에 network이름 확인(ifconfig)
```

# 2. OpenFx Setup

[OpenFx Documentation - OpenFx 1.0.0 documentation](https://keti-openfx.readthedocs.io/en/latest/index.html)

## 1. vi /etc/profile

```bash
export PATH=/usr/local/go/bin:$PATH

export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$PATH:/usr/local/bin:$GOPATH/bin
```

```bash
$ source /etc/profile
```

## 2. apt install list

python

python3

python-pip

python-pip3

docker

kubernetes

vim

golang

## 3. golang 라이브러리

google.golang.org/grpc

```bash
$ go get -u google.golang.org/grpc
$ go get -u golang.org/x/sys/unix
```

github.com/protocolbuffers/protobuf

```bash
$ curl -OL https://github.com/protocolbuffers/protobuf/releases/download/v3.7.1/protoc-3.7.1-linux-x86_64.zip
$ unzip protoc-3.7.1-linux-x86_64.zip -d protoc3

$ sudo mv protoc3/bin/* /usr/local/bin/
$ sudo mv protoc3/include/* /usr/local/include/

$ sudo chown $USER /usr/local/bin/protoc
$ sudo chown -R $USER /usr/local/include/google

# /etc/profile에 없다면 추가
$ export PATH=$PATH:/usr/local/bin
```

github.com/golang/protobuf/protoc-gen-go

```bash
$ go get -u github.com/golang/protobuf/protoc-gen-go
$ cd $GOPATH/src/github.com/golang/protobuf/protoc-gen-go
$ git checkout tags/v1.2.0 -b v1.2.0
$ go install
```

github.com/grpc-ecosystem/grpc-gateway

```bash
$ cd $GOPATH/src/github.com
$ git clone https://github.com/grpc-ecosystem/grpc-gateway.git
$ cd grpc-ecosystem/grpc-gateway
$ git checkout v1.4.1

// Install protoc-gen-grpc-gateway
$ cd protoc-gen-grpc-gateway
$ go get -u github.com/golang/glog
$ go install

#// Install protoc-gen-swagger
#$ cd ../protoc-gen-swagger
#$ go install
```

grpcio-tools

```bash
$ pip install grpcio-tools
$ pip3 install grpcio-tools
```

## 4. OpenFx build

### 1) git clone & regist exec. OpenFx-cli

git clone

```bash
$ cd $GOPATH/src/github.com/keti-openfx
$ git clone https://github.com/keti-openfx/openfx-cli.git
$ cd openfx-cli
```

make - comfile

```bash
$ pwd
    > $GOPATH/src/github.com/keti-openfx/openfx-cli
$ make build
    > go build
    > go install
```

build 확인

```bash
$ cd $GOPATH/bin
$ ls
    > openfx-cli
```

상단의 `/etc/profile` 설정을 확인하여 openfx-cli명령어를 바로 사용 가능하도록 등록합니다.

### 2) git clone & build OpenFx

git clone & checkout branch

```bash
$ pwd
    > $GOPATH/src/github.com/keti-openfx

$ git clone https://github.com/keti-openfx/openfx.git
$ cd openfx

$ pwd
    > $GOPATH/src/github.com/keti-openfx/openfx
$ git remote update
$ git checkout -t origin/openfx-iris-gpu-config
$ git status
    > On branch remotes/origin/openfx-iris-gpu-config
    > Changes not staged for commit:
    > (.. 이후 생략 ..)
```

### 3) gateway

```bash
$ pwd
    > $GOPATH/src/github.com/keti-openfx/openfx
```

openfx 디렉토리 내 Makefile의 `REGISTRY` 를 서버에 맞게 변경 후 컴파일

```bash
kubectl label nodes gpu01 type=gpunode
kubectl get nodes --show-labels

$ sudo vim Makefile
    > REGISTRY=<REGISTRY IP ADDRESS> : <PORT>
    > ...

$ make build
$ make push

# docker build --network=host -t 211.232.115.85:5000/fxgateway:2.1 .
# docker push 211.232.115.85:5000/fxgateway:2.1
```

### 4) Openfx executor

```bash
$ pwd
    > $GOPATH/src/github.com/keti-openfx/openfx/executor
```

각 런타임 하위 디렉토리에 있는 Makefile의 registry를 도커 레지스트리 서버에 맞춰 변경

```bash
$ cd go
$ sudo vim Makefile
registry=<REGISTRY IP ADDRESS>:<PORT>
...

$ cd ../python
$ sudo vim Makefile
registry=<REGISTRY IP ADDRESS>:<PORT>
...

$ cd ../nodejs
$ sudo vim Makefile
registry=<REGISTRY IP ADDRESS>:<PORT>
...

$ cd ../ruby
$ sudo vim Makefile
registry=<REGISTRY IP ADDRESS>:<PORT>
...

$ cd ../java
$ sudo vim Makefile
registry=<REGISTRY IP ADDRESS>:<PORT>
...

$ cd ../cpp
$ sudo vim Makefile
registry=<REGISTRY IP ADDRESS>:<PORT>
...

$ cd ../csharp
$ sudo vim Makefile
registry=<REGISTRY IP ADDRESS>:<PORT>
...
```

executor 경로로 돌아와 make 명령어 실행

```bash
(!) python3만 실행할 경우

pwd
>> $GOROOT/src/github.com/keti-openfx/openfx/executor/python

make python3

```

## 5. OpenFx deploy

### 1) kubernetes namespaces

```bash
pwd >> $GOROOT/go/src/github.com/keti-openfx/openfx/deploy

kubectl apply -f namespaces.yml
```

### 2) kubernetes secret

```bash
kubectl create secret docker-registry regcred --docker-server=211.232.115.85:5000 --docker-username=admin --docker-password=admin

kubectl get secret regcred --output=yaml
>> 결과 중 .dockerconfigjson 복사

vi /deploy/yaml/docker-registry-secret.yaml
>> .dockerconfigjson: 부분에 복사한 secret key 붙여넣기. (2곳)
```

### 3) kubernetes gateway-dep.yaml

nodename, host:port 수정

### 4) OpenFx gatewaydeploy

openfx-cli function deploy -f config.yaml --gateway 10.0.0.170:31113 -v

openfx-cli function list --gateway 211.232.115.85:31113

openfx-cli function list --gateway 192.168.101.112:31113