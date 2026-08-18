let L, o, I, t;
let facesBase;

function setup() {
  L = 220;
  t = 0;
  o = [20, 20, 20];
  createCanvas(L, L, WEBGL);
  orbitControl();

  // Vértices distribuídos nos eixos X, Y e Z (Tetraedro Tridimensional)
  let v0 = [30, 0, 0];
  let v1 = [0, 30, 0];
  let v2 = [0, 0, 30];
  let v3 = [30, 30, 30];

  // Decomposição em faces triangulares (garante coplanaridade e elimina piscamentos)
  facesBase = [
    [v0, v1, v2],
    [v0, v1, v3],
    [v1, v2, v3],
    [v2, v0, v3]
  ];

  I = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];
}

function draw() {
  background(220);

  // Ajuste de ângulo de observação para perspectiva nos três eixos (X, Y, Z)
  rotateX(-PI / 6);
  rotateY(PI / 4);

  t++;
  let wrot = vxe([0, 0, 1 / 400], 2 * PI);
  let wtrans = vxe([0, 0, 1 / 400], 2 * PI);

  stroke(0);
  strokeWeight(1.5);
  fill(150, 200, 255, 230); // Preenchimento com opacidade para suavizar intersecções

  // Renderização simplicial por primitivas triangulares
  for (let f = 0; f < facesBase.length; f++) {
    beginShape(TRIANGLES);
    for (let i = 0; i < facesBase[f].length; i++) {
      let verticeTransformado = transformarVertice(facesBase[f][i], o, wrot, wtrans, t);
      vertex(...verticeTransformado);
    }
    endShape(CLOSE);
  }
}

function vxe(v, e) {
  let res = [];
  for (let i = 0; i < v.length; i++) {
    res[i] = v[i] * e;
  }
  return res;
}

function vxa(v, a) {
  let res = [0, 0, 0];
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      res[j] += v[i] * a[i][j];
    }
  }
  return res;
}

function axa(a, b) {
  let c = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        c[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return c;
}

function rotVetor(v, xang, yang, zang) {
  let xrot = [
    [1, 0, 0],
    [0, cos(xang), -sin(xang)],
    [0, sin(xang), cos(xang)]
  ];
  let yrot = [
    [cos(yang), 0, sin(yang)],
    [0, 1, 0],
    [-sin(yang), 0, cos(yang)]
  ];
  let zrot = [
    [cos(zang), -sin(zang), 0],
    [sin(zang), cos(zang), 0],
    [0, 0, 1]
  ];

  let R = axa(axa(xrot, yrot), zrot);
  return vxa(v, R);
}

function deslVetor(v, deslocamento) {
  let res = [];
  for (let i = 0; i < 3; i++) {
    res[i] = v[i] + deslocamento[i];
  }
  return res;
}

function transformarVertice(v, orig, wrot, wtrans, t) {
  let angRot = vxe(wrot, t);
  let angTrans = vxe(wtrans, t);

  let vRot = rotVetor(v, ...angRot);
  let deslocamento = rotVetor(orig, ...angTrans);

  return deslVetor(vRot, deslocamento);
}
