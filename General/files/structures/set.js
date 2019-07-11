/* Sets */

function mySet() {
    // the var collection will hold the set
    const collection = [];
    // this method will check for the presence of an element and return true or false
    this.has = element => collection.includes(element);
    // this method will return all the values in the set
    this.values = () => collection;
    // this method will add an element to the set
    this.add = function (element) {
        if (!this.has(element)) {
            collection.push(element);
            return true;
        }
        return false;
    };
    // this method will remove an element from a set
    this.remove = function (element) {
        if (this.has(element)) {
            index = collection.indexOf(element);
            collection.splice(index, 1);
            return true;
        }
        return false;
    };
    // this method will return the size of the collection
    this.size = () => collection.length;
    // this method will return the union of two sets
    this.union = function (otherSet) {
        const unionSet = new mySet();
        const firstSet = this.values();
        const secondSet = otherSet.values();
        firstSet.forEach((e) => {
            unionSet.add(e);
        });
        secondSet.forEach((e) => {
            unionSet.add(e);
        });
        return unionSet;
    };
    // this method will return the intersection of two sets as a new set
    this.intersection = function (otherSet) {
        const intersectionSet = new mySet();
        const firstSet = this.values();
        firstSet.forEach((e) => {
            if (otherSet.has(e)) {
                intersectionSet.add(e);
            }
        });
        return intersectionSet;
    };
    // this method will return the difference of two sets as a new set
    this.difference = function (otherSet) {
        const differenceSet = new mySet();
        const firstSet = this.values();
        firstSet.forEach((e) => {
            if (!otherSet.has(e)) {
                differenceSet.add(e);
            }
        });
        return differenceSet;
    };
    // this method will test if the set is a subset of a different set
    this.subset = function (otherSet) {
        const firstSet = this.values();
        return firstSet.every((value) => otherSet.has(value));
    };
}
const setA = new mySet();
const setB = new mySet();
setA.add('a');
setB.add('b');
setB.add('c');
setB.add('a');
setB.add('d');
console.log(setA.subset(setB));
console.log(setA.intersection(setB).values());
console.log(setB.difference(setA).values());

const setC = new Set();
const setD = new Set();
setC.add('a');
setD.add('b');
setD.add('c');
setD.add('a');
setD.add('d');
console.log(setD.values());
setD.delete('a');
console.log(setD.has('a'));
console.log(setD.add('d'));
