// eslint-disable-next-line @typescript-eslint/ban-types
export const callOpenfxFn = (data: object) =>
  new Promise<string>((resolve, reject) => {
    fetch("http://10.0.0.144:8080/api/openfx/call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      // Then with the data from the response in JSON...
      .then((data) => {
        console.log("Success:", data);
        resolve(data.body);
      })
      // Then with the error genereted...
      .catch((error) => {
        reject(error);
      });
  });

const sendData = { fnName: "/py-package", data: "hello" };
callOpenfxFn(sendData).then((result) => printResult(result));

const printResult = (result: string) => {
  console.log(result);
};
