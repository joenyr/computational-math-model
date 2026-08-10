function setup() {
  R = 40;
  k = 0.01;
  d = 400;
  z = -60;
  npontos = 5
  createCanvas(d, d);
}

function draw() {
  background(d);
  pontosX = Array(npontos);
  pontosY = Array(npontos);
  function r(r,o,d) {
    x = r*Math.cos(o)+d/2;
    y = r*Math.sin(o)+d/2;
    return {x: x, y: y};
  }
  for(let i = 0; i<npontos+2; i++) {
      pontosX[i] = r(R,k+i*2*PI/npontos,d).x;
      pontosY[i] = r(R,k+i*2*PI/npontos,d).y;
    
    if (i > 1) {
     line(pontosX[i-2],pontosY[i-2],pontosX[i],pontosY[i]);
    }
  }
  k=k+0.01;
}
