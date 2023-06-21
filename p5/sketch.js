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
  background(240);
  let size = 12;
  strokeWeight(size);

  let V = [[120,90], [60,240], [300,285]];
  V[0] = [mouseX, mouseY];

  let r = V[0];
  let g = sub(V[1], r);
  let h = sub(V[2], r);

  stroke(210);
  for(let x=0; x<width; x+=size) {
    for(let y=0; y<height; y+=size) {
      point(x,y);
    }
  }

  //----- ナイーブすぎる実装
  stroke(0);
  for(let s=0; s<1; s+=1/6) {
    for(let t=0; t<1; t+=1/6) {
      let w = add(add(mul(t*(1-s), g), mul(s*t, h)), r);
      w[0] -= w[0] % size;
      w[1] -= w[1] % size;
      point(...w);
    }
  }
  //-----

  //----- よい実装
  let beginY = min(V[0][1], V[1][1], V[2][1]);
  let endY = max(V[0][1], V[1][1], V[2][1]);

  strokeWeight(2);
  line(0,beginY, width, beginY);
  line(0,endY, width, endY);
  //-----
}
