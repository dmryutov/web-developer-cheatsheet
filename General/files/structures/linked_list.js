/* LinkedList */

function LinkedList() {
    let length = 0;
    let head = null;

    const Node = function (element) {
        this.element = element;
        this.next = null;
    };

    this.size = () => length;

    this.head = () => head;

    this.add = element => {
        const node = new Node(element);
        if (head === null) {
            head = node;
        }
        else {
            let currentNode = head;
            while (currentNode.next) {
                currentNode = currentNode.next;
            }
            currentNode.next = node;
        }
        length++;
    };

    this.remove = element => {
        let currentNode = head;
        let previousNode;
        if (currentNode.element === element) {
            head = currentNode.next;
        }
        else {
            while (currentNode.element !== element) {
                previousNode = currentNode;
                currentNode = currentNode.next;
            }
            previousNode.next = currentNode.next;
        }

        length--;
    };

    this.isEmpty = () => length === 0;

    this.indexOf = element => {
        let currentNode = head;
        let index = -1;
        while (currentNode) {
            index++;
            if (currentNode.element === element) {
                return index;
            }
            currentNode = currentNode.next;
        }
        return -1;
    };

    this.elementAt = index => {
        let currentNode = head;
        let count = 0;
        while (count < index) {
            count++;
            currentNode = currentNode.next;
        }
        return currentNode.element;
    };


    this.addAt = (index, element) => {
        const node = new Node(element);
        let currentNode = head;
        let previousNode;
        let currentIndex = 0;
        if (index > length) {
            return false;
        }
        if (index === 0) {
            node.next = currentNode;
            head = node;
        }
        else {
            while (currentIndex < index) {
                currentIndex++;
                previousNode = currentNode;
                currentNode = currentNode.next;
            }
            node.next = currentNode;
            previousNode.next = node;
        }
        length++;
    };

    this.removeAt = index => {
        let currentNode = head;
        let previousNode;
        let currentIndex = 0;
        if (index < 0 || index >= length) {
            return null;
        }
        if (index === 0) {
            head = currentNode.next;
        }
        else {
            while (currentIndex < index) {
                currentIndex++;
                previousNode = currentNode;
                currentNode = currentNode.next;
            }
            previousNode.next = currentNode.next;
        }
        length--;
        return currentNode.element;
    };
}

const conga = new LinkedList();
conga.add('Kitten');
conga.add('Puppy');
conga.add('Dog');
conga.add('Cat');
conga.add('Fish');
console.log(conga.size());
console.log(conga.removeAt(3));
console.log(conga.elementAt(3));
console.log(conga.indexOf('Puppy'));
console.log(conga.size());
