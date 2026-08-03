function setup() {
  k = 0;
  l = 0;
  d = 5;
  L = 400
  createCanvas(L, L);
  background(L);
}

function draw() {
  if (l == 0) line(0,L-k,k,0);
  if (l == 1) line(k,0,L,k);
  if (l == 2) line(L,k,L-k,L);
  if (l == 3) line(L-k,L,0,L-k);
  
  k = k+d;
  if(k>L) {
    if(l<4) {
      k = 0;
      l = l+1;
    } else {
      k = 0;
      l = 0;
      background(L);
    }
    }
}
