function setup() {
  R = 40;
  k = 0.01;
  d = 400;
  z = -60;
  createCanvas(d, d);
}

function draw() {
  background(d);
  pontosX = Array(4);
  pontosY = Array(4);
  function r(r,o,d) {
    x = r*Math.cos(o)+d/2;
    y = r*Math.sin(o)+d/2;
    return {x: x, y: y};
  }
  for(let i = 0; i<5; i++) {
      pontosX[i] = r(R,k+i*PI/2,d).x;
      pontosY[i] = r(R,k+i*PI/2,d).y;
    
    if (i > 0) {
     line(pontosX[i-1],pontosY[i-1],pontosX[i],pontosY[i]);
     line(pontosX[i-1],pontosY[i-1],d/2,z+d/2)
    }
  }
  k=k+0.01;
}
