//----- general
let assert = (cond) => {if (!cond) debugger; }
//-----

//----- vector
let mul = (s,a) => a.map(e => s*e);
let add = (a,b) => {
  let n = a.length;
  assert(n === b.length);
  let s = new Array(n);
  for(let i=0; i<n; i++) s[i] = a[i] + b[i];
  return s;
}
let sub = (a,b) => add(a, mul(-1, b));
let mag = (a) => Math.sqrt(a.map(x => x**2).reduce((x,y) => x+y));
let dot = (a,b) => {
  let n = a.length;
  assert(n === b.length);
  let d = 0;
  for(let i=0; i<n; i++) d += a[i] * b[i];
  return d;
}
let normalize = (a) => mul(1/mag(a), a);
//-----

function setup() {
  createCanvas(360,360);
}

function draw() {
  background(220);
  strokeWeight(12);

  let V = [[120,150], [60,240], [300,285]];
}
