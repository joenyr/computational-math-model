function setup() {
  L = 220;
  o = [0,0,0];
  createCanvas(L, L,WEBGL);
  orbitControl();
  p = [20,20,20];
  I = [[1,0,0],[0,1,0],[0,0,1]];
}

function draw() {
  
  function plano(L) {
    background(L);
    line(L/2,0,0,-L/2,0,0);
    line(0,L/2,0,0,-L/2,0);
    line(0,0,L/2,0,0,-L/2);
  }
  plano(L)

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
    xrot = [[1,0,0],
            [0,cos(xang),-sin(xang)],
            [0,sin(xang),cos(xang)]];
    yrot = [[cos(yang),0,sin(yang)],
            [0,1,0],
            [-sin(yang),0,cos(yang)]];
    zrot = [[cos(zang),-sin(zang),0],
            [sin(zang),cos(zang),0],
            [0,0,1]];

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

  function piramide(a) {
    for(i=1; i<4;i++) {
      line(...o,...a[i]);
    }
  }
  piramide(vxa(p,I));
}
