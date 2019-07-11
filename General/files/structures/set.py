a = set([1, 2, 1, 3, 4])
b = {4, 4, 5, 6}
c = {1, 2}

print(a, b, c)
print(c.issubset(a), c <= a)
print(a.union(b), a | b)
print(a.intersection(b), a & b)
print(a.difference(b), a - b)

print(c)
c.add(3)
print(c)
c.remove(2)
print(c)
c.pop()
print(c)
c.clear()
print(c)
