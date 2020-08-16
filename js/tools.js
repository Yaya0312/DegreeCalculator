const getsNodes = (x) => document.querySelectorAll(x);
const zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]); // a[int], b[int] -> [[a[0],b[0]]...,[a[n],b[n]]]
const sum = (arr) => arr.reduce((a,c) => a + c); // a[int] -> (a[0] + ... + a[n])

export { getsNodes, zip, sum }