function setup() {
  k = 0.01;
  d = 400;
  npontos = 3 // triângulo
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
  function poligono(o1,o2,theta,R) {
    for(let i = 0; i<npontos+2; i++) {
      pontosX[i] = r(R,k+i*2*PI/npontos+theta,d).x+o1;
      pontosY[i] = r(R,k+i*2*PI/npontos+theta,d).y+o2;
    
    if (i > 1) {
     line(pontosX[i-1],pontosY[i-1],pontosX[i],pontosY[i]);
    }
  }
  }

  poligono(0,0,PI/npontos,40);
  if (npontos % 2 == 0) {
      poligono(60*Math.cos(k),60*Math.sin(k),PI/npontos,6);
  } else {
    poligono(60*Math.cos(k),60*Math.sin(k),0,6);
  }
  k=k+0.01;
}
