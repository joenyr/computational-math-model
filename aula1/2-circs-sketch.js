function setup() {
  k = 0;
  createCanvas(400, 400);
  background(400);
}

function draw() {
  
  r = random(50);
  x = random(400);
  y = random(400);
  
  cr = random(256);
  cg = random(256);
  cb = random(256);
  
  fill(cr,cg,cb);
  
  circle(x,y,r);

  k = k+1
  if(k>400) {
    background(400);
    k = 0;
  }
}
