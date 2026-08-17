function setup() {
  L = 220;
  O = L/2;
  createCanvas(L, L);
  background(L);
  line(0,O,L,O);
  line(O,0,O,L);
  p = [O,3*O];
}

function draw() {
  function objeto(p) {
    line(p[1],p[2]);
  }
  objeto(p);
  
  function plano(L) {
    background(L);
    line(0,O,L,O);
    line(O,0,O,L);
  }

  function vxa(v,a) {
    b = Array[3][3];
    for (let x=1; x<4; x++) {
      for (let y=1; y<4; y++) {
        b[x][y] = v[x]*a[x][y];
      }
    }
    return b;
  }

  function axa(a,b) {
    c = Array[3][3];
    for (let x=1; x<4; x++) {
      for (let y=1; y<4; y++) {
        for (let z=1; z,3; z++) {
          b[x][y] = a[x][y][z]*b[y][x][z];
        }
      }
    }
    return c;
  }

  function rot(a, xang, yang, zang) {
    xrot = [[1,0,0],[0,cos(xang),-sin(xang)],[0,sin(xang),cos(xang)]];
    yrot = [[cos(yang),0,sin(yang)],[0,1,0],[-sin(yang),0,cos(yang)]];
    zrot = [[cos(zang),-sin(zang),0],[sin(zang),cos(zang),0],[0,0,1]];

    for(let x=1; x<4; x++) {
      for(let y=1; y<4; y++) {
        for(let z=1; z<4; z++) {
      rot[x][y][z] = 1;
    }
    }
    }
    rot = axa(rot,xrot);
    rot = axa(rot,yrot);
    rot = axa(rot,zrot);

    return axa(a,rot);
  }

  
}
