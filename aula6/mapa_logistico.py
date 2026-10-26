import numpy as np

def eq(x,r):
    xk = r*x*(1-x)
    return xk

def ml(x0,r,nt):
    x = x0
    for i in range(nt):
        x = eq(x,r)
    xc = x
    return xc

def tr(x0,r,nt,ascii,rem,qnt):
    limit_inf = rem+ascii*(1-2*rem)/qnt
    limit_sup = rem+(ascii+1)*(1-2*rem)/qnt
    e = -1

    xc = ml(x0,r,nt)
    while xc < limit_inf or xc > limit_sup:
        xc = eq(xc,r)
        e += 1
    return e

# experimento
print(tr(0.687952847,3.963,300,79,0.1,300))
