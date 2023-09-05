export const fetchAllCaps = text => {
  return new Promise(res => {
    setTimeout(() => res(text.toUpperCase()), 1000);
  });
};
