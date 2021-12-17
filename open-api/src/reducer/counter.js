export const INCRESE = "COUNT/INCRESE";

export const increseCount = (count) => ({ type: INCRESE, count });

const initalState = {
  count: 0,
};

const counter = (state = initalState, action) => {
  switch (action.type) {
    case INCRESE:
      return {
        ...state,
        count: action.count,
      };

    // default를 쓰지 않으면 맨처음 state에 count값이 undefined가 나옵니다 꼭! default문을 넣으세요
    default:
      return state;
  }
};
