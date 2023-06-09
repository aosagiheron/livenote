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
let cross2d = (a,b) => {
  assert(a.length === 2 && b.length === 2);
  return a[0]*b[1] - a[1]*b[0];
}
let normalize = (a) => mul(1/mag(a), a);
//-----

function setup() {
  createCanvas(360,360);
}


function draw() {
  background(240);
  let size = 6;
  strokeWeight(size);

  let V = [[120,60], [40,210], [300,270]];
  V[0] = [mouseX, mouseY];

  let r = V[0];
  let g = sub(V[1], r);
  let h = sub(V[2], r);

  strokeWeight(0);
  fill(220);
  for(let x=0; x<width; x+=size) {
    for(let y=0; y<height; y+=size) {
      rect(x, y, size-2, size-2);
    }
  }

  //----- ナイーブすぎる実装
  /*
  stroke(0);
  for(let s=0; s<1; s+=1/6) {
    for(let t=0; t<1; t+=1/6) {
      let w = add(add(mul(t*(1-s), g), mul(s*t, h)), r);
      w[0] -= w[0] % size;
      w[1] -= w[1] % size;
      point(...w);
    }
  }
  */
  //-----

  let Minv_v = (g, h, v) => {
    let d = g[0]*h[1] - g[1]*h[0];
    return mul(1/d, [h[1]*v[0] - h[0]*v[1], -g[1]*v[0]+g[0]*v[1]]);
  }

  /* 内外判定テスト
  if (frameCount%30 === 0) {
    let v = sub([mouseX, mouseY], r);
    let w = Minv_v(g, h, v);
    console.log('w='+w);
  }
  */

  //----- よりよい実装
  let minY = min(V[0][1], V[1][1], V[2][1]);
  let maxY = max(V[0][1], V[1][1], V[2][1]);
  minY -= minY % size;
  maxY -= maxY % size;

  for(let y=minY; y<maxY; y+=size) {
    let t = (y-r[1]-g[1])/(h[1]-g[1]);
    let xAll =[
      r[0] + ((y - r[1]) / g[1]) * g[0],
      r[0] + ((y-r[1])/h[1])*h[0],
      r[0]+g[0]+t*(h[0]-g[0]),
    ];

    let xInside = xAll.filter(x => {
      let v = sub([x,y], r);
      let w = Minv_v(g, h, v);
      let e = 0.001;
      return w[0]>-e && w[1]>-e && (w[0]+w[1])<(e+1.05);
    });

    let minX = min(xInside);
    let maxX = max(xInside);
    minX -= minX % size;
    maxX -= maxX % size;

    strokeWeight(0);
    fill(150);
    for(let x=minX; x<maxX; x+=size) {
      rect(x, y, size-2, size-2);
    }

    fill(0);
    rect(minX, y, size-2, size-2);
    rect(maxX, y, size-2, size-2);
  }

  stroke(0);
  strokeWeight(2);
  line(0, minY, width, minY);
  line(0, maxY, width, maxY);
  //-----
}
