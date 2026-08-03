function setup() {
  k = 0
  
  createCanvas(400,400);

  background(220);
  
  line (10,10,80,80)
  
  stroke(0,0,255);
  fill(255,0,0);
  
  point(10,100,100);
  
  triangle(140,160,30,120,130,130);

  rect(130,130,180,180);
}

function draw() {  
  k=k+1;
  line (0,0,k,k);
  if(k>400) {
  background(220);  
  k=0;}
}

// Primeira função roda uma vez (a segunda repete ciclos)
