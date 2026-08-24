let o,l,p,po,distx,disty,f,i;
function setup() {
  createCanvas(400, 400);
  background(400);
  o = 200;
  l = 200;
  t1 = 10;
  t2 = 8;
  p = [o+t1,o+t2];
  f = 50/100;
}

function draw() {
  stroke(255, 0, 0)
  strokeWeight(4);
  pt = [[o-l/2,o-l*sqrt(3)/4],[o+l/2,o-l*sqrt(3)/4],[o,o+l*sqrt(3)/4]]
  point(o-l/2,o-l*sqrt(3)/4);
  point(o+l/2,o-l*sqrt(3)/4);
  point(o,o+l*sqrt(3)/4);
  stroke(0)
  strokeWeight(2);
  if(p[0]==o+t1 && p[1]==o+t2)
  point(p[0],p[1]);
  
  let r = Math.random();
  
  if(r<1/3) {
    i = 0;
  } else {
    if(r>1/3 && r<2/3) {
      i = 1;
    } else {
        i = 2;
    }
  }
    distx = pt[i][0]-p[0];
    disty = pt[i][1]-p[1];
    p[0] = p[0]+f*distx;
    p[1] = p[1]+f*disty;
    point(p[0],p[1]);
}
