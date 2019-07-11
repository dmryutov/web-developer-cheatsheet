class AdjacencyList(object):
    def __init__(self):
        self.List = {}
    
    def addEdge(self, fromVertex, toVertex):
        # check if vertex is already present
        if fromVertex in self.List.keys():
            self.List[fromVertex].append(toVertex)
        else:
            self.List[fromVertex] = [toVertex]
    
    def printList(self):
        for i  in self.List:
            print(i,'->',' -> '.join([str(j) for j in self.List[i]]))
            
al = AdjacencyList()
al.addEdge(0, 1)
al.addEdge(0, 4)
al.addEdge(4, 1)
al.addEdge(4, 3)
al.addEdge(1, 0)
al.addEdge(1, 4)
al.addEdge(1, 3)
al.addEdge(1, 2)
al.addEdge(2, 3)
al.addEdge(3, 4)

al.printList()
