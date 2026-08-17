let L, o, p, I, t, w;

function setup() {
  L = 220;
  t = 0;
  o = [0, 0, 0];
  createCanvas(L, L, WEBGL);
  orbitControl();
  p = [20, 20, 20];
  I = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
}

function draw() {
  function plano(L) {
    background(220); // Ajustado para não usar a variável global de escopo L incorretamente como cor
    line(L/2, 0, 0, -L/2, 0, 0);
    line(0, L/2, 0, 0, -L/2, 0);
    line(0, 0, L/2, 0, 0, -L/2);
  }
  plano(L);

  function vxe(v, e) {
    for(i=0;i<3;i++) {
      v[i] = v[i]*e;
    }
    return v;
  }

  function vxa(v, a) {
    let b = [];
    for (let i = 0; i < 3; i++) {
      b[i] = [];
      for (let j = 0; j < 3; j++) {
        b[i][j] = v[i] * a[i][j];
      }
    }
    return b;
  }

  function axa(a, b) {
    let c = [[0,0,0], [0,0,0], [0,0,0]];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          c[i][j] += a[i][k] * b[k][j];
        }
      }
    }
    return c;
  }

  function rot(a, xang, yang, zang) {
    let xrot = [[1, 0, 0],
                [0, cos(xang), -sin(xang)],
                [0, sin(xang), cos(xang)]];
    
    let yrot = [[cos(yang), 0, sin(yang)],
                [0, 1, 0],
                [-sin(yang), 0, cos(yang)]];
    
    let zrot = [[cos(zang), -sin(zang), 0],
                [sin(zang), cos(zang), 0],
                [0, 0, 1]];

    let matrizCombinada = axa(xrot, yrot);
    matrizCombinada = axa(matrizCombinada, zrot);

    return axa(a, matrizCombinada);
  }

  function piramide(a) {
    for (let i = 0; i < 3; i++) {
      line(...o,...a[i]);
      if (i<2)    line(...a[i],...a[i+1]);
    }
    line(...a[2],...a[0]);
  }

  t++;
  m = rot(vxa(p,I),...vxe([1/200,1/300,1/400],t*2*PI));
  piramide(m);
}
