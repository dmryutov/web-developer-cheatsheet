/* Trie Data Structure */

const Node = function () {
    this.keys = new Map();
    this.end = false;
    this.setEnd = function () {
        this.end = true;
    };
    this.isEnd = function () {
        return this.end;
    };
};

const Trie = function () {
    this.root = new Node();

    this.add = function (input, node = this.root) {
        if (input.length == 0) {
            node.setEnd();
            return;
        } if (!node.keys.has(input[0])) {
            node.keys.set(input[0], new Node());
            return this.add(input.substr(1), node.keys.get(input[0]));
        }
        return this.add(input.substr(1), node.keys.get(input[0]));
    };

    this.isWord = function (word) {
        let node = this.root;
        while (word.length > 1) {
            if (!node.keys.has(word[0])) {
                return false;
            }
            node = node.keys.get(word[0]);
            word = word.substr(1);
        }
        return !!((node.keys.has(word) && node.keys.get(word).isEnd()));
    };

    this.print = function () {
        const words = new Array();
        const search = (node, string) => {
            if (node.keys.size != 0) {
                for (const letter of node.keys.keys()) {
                    search(node.keys.get(letter), string.concat(letter));
                }
                if (node.isEnd()) {
                    words.push(string);
                }
            }
            else {
                string.length > 0 ? words.push(string) : undefined;
            }
        };
        search(this.root, new String());
        return words.length > 0 ? words : mo;
    };
};

myTrie = new Trie();
myTrie.add('ball');
myTrie.add('bat');
myTrie.add('doll');
myTrie.add('dork');
myTrie.add('do');
myTrie.add('dorm');
myTrie.add('send');
myTrie.add('sense');
console.log(myTrie.isWord('doll'));
console.log(myTrie.isWord('dor'));
console.log(myTrie.isWord('dorf'));
console.log(myTrie.print());
