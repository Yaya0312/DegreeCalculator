const getsNodes = (x) => document.querySelectorAll(x);

const getsNode = (x) => document.querySelector(x);

// a[int], b[int] -> [[a[0],b[0]]..[a[n],b[n]]]
const zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]);

// a[int] -> (a[0] + ... + a[n])
const sum = (arr) => arr.reduce((a, c) => a + c);

export {
  getsNodes,
  getsNode,
  zip,
  sum,
};
