class Singleton(object):
    def __new__(cls):
        if not hasattr(cls, 'instance') or not cls.instance:
            cls.instance = super().__new__(cls)
            
        return cls.instance


obj1 = Singleton()
obj2 = Singleton()

print(obj1 is obj2) #  True
print(obj1 == obj2) # True
print(type(obj1) == type(obj2)) # True
print(id(obj1) == id(obj2)) # True