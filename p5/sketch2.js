function setup() {
  createCanvas(360,360);
}

function draw() {
  background(220);
  strokeWeight(12);

  let V = [[120,150], [60,240], [300,285]];

  V[1] = [mouseX, mouseY];

  let minX = Math.min(V[0][0], V[1][0], V[2][0]);
  let maxX = Math.max(V[0][0], V[1][0], V[2][0]);

  let f = (x, p, q) => {
    let x0 = p[0];
    let x1 = q[0];
    let y0 = p[1];
    let y1 = q[1];
    return ((y1-y0)/(x1-x0)) * (x-x0) + y0;
  }

  for(let x=minX; x<maxX; x+=12) {
    let f01 = f(x, V[0], V[1]);
    let f12 = f(x, V[1], V[2]);
    let f02 = f(x, V[0], V[2]);

    let cx = V[0][0];
    let minY = x<cx ? f01 : f02;
    
    let maxY = Math.max(f01, f12);
    stroke('red');
    point(x, minY);
    stroke('blue');
    point(x, maxY);
  }

  for(let v of V) {
    point(...v);
  }
}
