/* Maps */

const myMap = function () {
    this.collection = {};
    this.count = 0;
    this.size = function () {
        return this.count;
    };
    this.set = function (key, value) {
        this.collection[key] = value;
        this.count++;
    };
    this.has = function (key) {
        return (key in this.collection);
    };
    this.get = function (key) {
        return (key in this.collection) ? this.collection[key] : null;
    };
    this.delete = function (key) {
        if (key in this.collection) {
            delete this.collection[key];
            this.count--;
        }
    };
    this.values = function () {
        const result = new Array();
        for (const key of Object.keys(this.collection)) {
            result.push(this.collection[key]);
        }
        return (result.length > 0) ? result : null;
    };
    this.clear = function () {
        this.collection = {};
        this.count = 0;
    };
};

const map = new myMap();
map.set('arms', 2);
map.set('fingers', 10);
map.set('eyes', 2);
map.set('belley button', 1);

console.log(map.get('fingers'));
console.log(map.size());
console.log(map.values());

const map2 = new Map();
map2.has('hands');
map2.entries();

const keyObj = {};
const keyFunc = () => {};

map2.set('hello', 'string value');
map2.set(keyObj, 'obj value');
map2.set(keyFunc, 'func value');
map2.set(NaN, 'NaN value');

console.log(map2.size);

console.log(map2.get('hello'));
console.log(map2.get(keyObj));
console.log(map2.get(keyFunc));
console.log(map2.get(NaN));
