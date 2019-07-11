/* Hash Table */

const hash = (string, max) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash += string.charCodeAt(i);
    }
    return hash % max;
};

const HashTable = function () {
    const storage = [];
    const storageLimit = 14;

    this.print = () => {
        console.log(storage);
    };

    this.add = (key, value) => {
        const index = hash(key, storageLimit);
        if (storage[index] === undefined) {
            storage[index] = [
                [key, value],
            ];
        }
        else {
            let inserted = false;
            for (let i = 0; i < storage[index].length; i++) {
                if (storage[index][i][0] === key) {
                    storage[index][i][1] = value;
                    inserted = true;
                }
            }
            if (inserted === false) {
                storage[index].push([key, value]);
            }
        }
    };

    this.remove = key => {
        const index = hash(key, storageLimit);
        if (storage[index].length === 1 && storage[index][0][0] === key) {
            delete storage[index];
        }
        else {
            for (let i = 0; i < storage[index].length; i++) {
                if (storage[index][i][0] === key) {
                    delete storage[index][i];
                }
            }
        }
    };

    this.lookup = key => {
        const index = hash(key, storageLimit);
        if (storage[index] === undefined) {
            return undefined;
        }
        for (let i = 0; i < storage[index].length; i++) {
            if (storage[index][i][0] === key) {
                return storage[index][i][1];
            }
        }
    };
};


console.log(hash('quincy', 10));

const ht = new HashTable();
ht.add('beau', 'person');
ht.add('fido', 'dog');
ht.add('rex', 'dinosour');
ht.add('tux', 'penguin');
console.log(ht.lookup('tux'));
ht.print();
