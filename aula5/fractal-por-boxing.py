import skimage, numpy, matplotlib.pyplot as plt

# Definindo funções
def analisar_box(img, i_inicial, i_final, j_inicial, j_final, escuro_limitrofe):
    '''
    Retorna true se luminosidade menor que do escuro_limitrofe.
    '''
    
    box = img[i_inicial:i_final, j_inicial:j_final]
    
    return numpy.any(box < escuro_limitrofe)

def qnt_true(img, lista_tamanhos, escuro_limitrofe=0.5):
    shape = img.shape
    quantidades_true = []
    # For para cada tamanho de box
    for x in lista_tamanhos:
        N = 0
        # Contar quantidade de boxs true
        for i in range(0, shape[0], x):
            for j in range(0, shape[1], x):
                if analisar_box(img,i,i+x,j,j+x,escuro_limitrofe): N += 1
        quantidades_true.append(N)
    return quantidades_true

def dimensão_fractal(img, tamanhos):
    N = qnt_true(img,tamanhos)

    x = -numpy.log(tamanhos)
    y = numpy.log(N)
    coef = numpy.polyfit(x, y, 1)   # grau 1 = reta
    D = coef[0]                     # inclinação = dimensão fractal
    C = coef[1]                     # intercepto

    y_pred = numpy.polyval(coef, x)
    R2 = 1 - ((y - y_pred)**2).sum() / ((y - y.mean())**2).sum()
    return x,y,D,C,R2,N

# Aplicação
tamanhos = [1,2,4,8,16,32,64,128,256]

## Processando imagem 
img = skimage.io.imread("git/computational-math-model/SierpinskiTriangle.png")
img = skimage.color.rgb2gray(img)

x1,y1,D1,C1,R21,qnt_true1 = dimensão_fractal(img, tamanhos)

## Sierpinski de alta resolução
n = 4000
i = numpy.arange(n)[:, None]
j = numpy.arange(n)[None, :]
high_res = ((i & j) == j).astype(float)
high_res = 1 - high_res

x2,y2,D2,C2,R22,qnt_true2 = dimensão_fractal(high_res, tamanhos)

# Plotagem e print
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

ax1.plot(x1, y1, 'ro', label='Dados do boxing Baixa Resu')
ax1.plot(x1, D1*x1+C1, 'b--', label='Regressão linear')
ax1.set_xlabel("log(1/ε)")
ax1.set_ylabel("log N(ε)")
ax1.legend()
ax1.grid(True)
ax1.set_title(f"Dimensão fractal por box-counting: {D1:.3f} (R² = {R21:.3f})")

ax2.plot(x2, y2, 'ro', label='Dados do boxing Alta Resu')
ax2.plot(x2, D2*x2+C2, 'b--', label='Regressão linear')
ax2.set_xlabel("log(1/ε)")
ax2.set_ylabel("log N(ε)")
ax2.legend()
ax2.grid(True)
ax2.set_title(f"Dimensão fractal por box-counting: {D2:.3f} (R² = {R22:.3f})")

plt.show()
print(f'Baixa resu: Qnt true de boxs = {qnt_true1}, D = {D1}, C = {C1}, R² = {R21:.3f}')
print(f'Alta resu: Qnt true de boxs = {qnt_true2}, D = {D2}, C = {C2}, R² = {R22:.3f}')
