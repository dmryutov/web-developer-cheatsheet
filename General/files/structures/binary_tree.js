/* Binary Search Tree */

class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BST {
    constructor() {
        this.root = null;
    }
    add(data) {
        const node = this.root;
        if (node === null) {
            this.root = new Node(data);
        }
        else {
            const searchTree = node => {
                if (data < node.data) {
                    if (node.left === null) {
                        node.left = new Node(data);
                    }
                    else if (node.left !== null) {
                        return searchTree(node.left);
                    }
                }
                else if (data > node.data) {
                    if (node.right === null) {
                        node.right = new Node(data);
                    }
                    else if (node.right !== null) {
                        return searchTree(node.right);
                    }
                }
                else {
                    return null;
                }
            };
            return searchTree(node);
        }
    }
    findMin() {
        let current = this.root;
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
    }
    findMax() {
        let current = this.root;
        while (current.right !== null) {
            current = current.right;
        }
        return current.data;
    }
    find(data) {
        let current = this.root;
        while (current.data !== data) {
            if (data < current.data) {
                current = current.left;
            }
            else {
                current = current.right;
            }
            if (current === null) {
                return null;
            }
        }
        return current;
    }
    isPresent(data) {
        let current = this.root;
        while (current) {
            if (data === current.data) {
                return true;
            }
            if (data < current.data) {
                current = current.left;
            }
            else {
                current = current.right;
            }
        }
        return false;
    }
    remove(data) {
        const removeNode = (node, data) => {
            if (node == null) {
                return null;
            }
            if (data == node.data) {
                // node has no children
                if (node.left == null && node.right == null) {
                    return null;
                }
                // node has no left child
                if (node.left == null) {
                    return node.right;
                }
                // node has no right child
                if (node.right == null) {
                    return node.left;
                }
                // node has two children
                let tempNode = node.right;
                while (tempNode.left !== null) {
                    tempNode = tempNode.left;
                }
                node.data = tempNode.data;
                node.right = removeNode(node.right, tempNode.data);
                return node;
            } if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;
            }
            node.right = removeNode(node.right, data);
            return node;
        };
        this.root = removeNode(this.root, data);
    }
    isBalanced() {
        return (this.findMinHeight() >= this.findMaxHeight() - 1);
    }
    findMinHeight(node = this.root) {
        if (node == null) {
            return -1;
        }
        const left = this.findMinHeight(node.left);
        const right = this.findMinHeight(node.right);
        if (left < right) {
            return left + 1;
        }
        return right + 1;
    }
    findMaxHeight(node = this.root) {
        if (node == null) {
            return -1;
        }
        const left = this.findMaxHeight(node.left);
        const right = this.findMaxHeight(node.right);
        if (left > right) {
            return left + 1;
        }
        return right + 1;
    }
    inOrder() {
        if (this.root == null) {
            return null;
        }
        const result = new Array();
        function traverseInOrder({left, data, right}) {
            left && traverseInOrder(left);
            result.push(data);
            right && traverseInOrder(right);
        }
        traverseInOrder(this.root);
        return result;
    }
    preOrder() {
        if (this.root == null) {
            return null;
        }
        const result = new Array();
        function traversePreOrder({data, left, right}) {
            result.push(data);
            left && traversePreOrder(left);
            right && traversePreOrder(right);
        }
        traversePreOrder(this.root);
        return result;
    }
    postOrder() {
        if (this.root == null) {
            return null;
        }
        const result = new Array();
        function traversePostOrder({left, right, data}) {
            left && traversePostOrder(left);
            right && traversePostOrder(right);
            result.push(data);
        }
        traversePostOrder(this.root);
        return result;
    }
    levelOrder() {
        const result = [];
        const Q = [];
        if (this.root != null) {
            Q.push(this.root);
            while (Q.length > 0) {
                const node = Q.shift();
                result.push(node.data);
                if (node.left != null) {
                    Q.push(node.left);
                }
                if (node.right != null) {
                    Q.push(node.right);
                }
            }
            return result;
        }
        return null;
    }
}


const bst = new BST();

bst.add(9);
bst.add(4);
bst.add(17);
bst.add(3);
bst.add(6);
bst.add(22);
bst.add(5);
bst.add(7);
bst.add(20);

console.log(bst.findMinHeight());
console.log(bst.findMaxHeight());
console.log(bst.isBalanced());
bst.add(10);
console.log(bst.findMinHeight());
console.log(bst.findMaxHeight());
console.log(bst.isBalanced());
console.log(`inOrder: ${bst.inOrder()}`);
console.log(`preOrder: ${bst.preOrder()}`);
console.log(`postOrder: ${bst.postOrder()}`);

console.log(`levelOrder: ${bst.levelOrder()}`);
