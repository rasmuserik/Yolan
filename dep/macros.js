var macros = {};

var onEach = [];

exports["transform"] = function(node) {
    if (typeof node === "string") {
        return node;
    } else {}
    node = onEach.reduce(function(acc, obj) {
        return obj["transform"].call(null, acc);
    }, node);
    if (macros[node[0]]) {
        node = macros[node[0]]["transform"].call(null, node);
    } else {
        node = node.map(exports["transform"]);
    }
    return node;
};

exports["transformList"] = function(list) {
    return list.map(exports["transform"]);
};

exports["reverse"] = function(node) {
    if (typeof node === "string") {
        return node;
    } else {}
    node = onEach.reverse().reduce(function(acc, obj) {
        return obj["reverse"].call(null, acc);
    }, node);
    node = exports.reverseList(node);
    node = Object.keys(macros).reverse().reduce(function(acc, obj) {
        return macros[obj]["reverse"].call(null, acc);
    }, node);
    return node;
};

exports["reverseList"] = function(list) {
    return list.map(exports["reverse"]);
};

macros["quote"] = {
    transform: function(node) {
        return node;
    },
    reverse: function(node) {
        return node;
    }
};

macros["if"] = {
    transform: function(node) {
        return [ "if-else", exports.transform(node[1]), [ "do" ].concat(exports.transformList(node.slice(2))) ];
    },
    reverse: function(node) {
        if (node[0] === "if-else" && node["length"] === 3) {
            if (node[2][0] === "do") {
                return [ "if", node[1] ].concat(node[2].slice(1));
            } else {
                return [ "if", node[1], node[2] ];
            }
        } else {}
        return node;
    }
};

macros["#"] = {
    transform: function(node) {
        return [ "@annotation", [ "#" ].concat(node.slice(1)) ];
    },
    reverse: function(node) {
        return node;
    }
};

console.log("HERE", "annotation");