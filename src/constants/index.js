export let operators = ["+", "-", "*", "/"];
export const updateOperators = (newList) => {
  operators = newList;
};
export const getOperators = () => {
  return operators;
};
