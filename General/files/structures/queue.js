/* Queues */

function Queue() {
    collection = [];
    this.print = () => {
        console.log(collection);
    };
    this.enqueue = element => {
        collection.push(element);
    };
    this.dequeue = () => collection.shift();
    this.front = () => collection[0];
    this.size = () => collection.length;
    this.isEmpty = () => collection.length === 0;
}

const q = new Queue();
q.enqueue('a');
q.enqueue('b');
q.enqueue('c');
q.print();
q.dequeue();
console.log(q.front());
q.print();


function PriorityQueue() {
    const collection = [];
    this.printCollection = () => {
        (console.log(collection));
    };
    this.enqueue = function (element) {
        if (this.isEmpty()) {
            collection.push(element);
        }
        else {
            let added = false;
            for (let i = 0; i < collection.length; i++) {
                if (element[1] < collection[i][1]) { // checking priorities
                    collection.splice(i, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added) {
                collection.push(element);
            }
        }
    };
    this.dequeue = () => {
        const value = collection.shift();
        return value[0];
    };
    this.front = () => collection[0];
    this.size = () => collection.length;
    this.isEmpty = () => collection.length === 0;
}

const pq = new PriorityQueue();
pq.enqueue(['Beau Carnes', 2]);
pq.enqueue(['Quincy Larson', 3]);
pq.enqueue(['Ewa Mitulska-Wójcik', 1]);
pq.enqueue(['Briana Swift', 2]);
pq.printCollection();
pq.dequeue();
console.log(pq.front());
pq.printCollection();
