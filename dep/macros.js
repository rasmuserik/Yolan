var macros = {};

var onEach = [];

var forwardTransforms = [];

var reverseTransforms = [];

exports["transform"] = function(node) {
    if (typeof node === "string") {
        return node;
    } else {}
    var i = forwardTransforms["length"];
    var done = false;
    var finish = function() {
        return done = true;
    };
    while (0 < i) {
        i = i - 1;
        node = forwardTransforms[i].call(null, node, finish);
        if (done) {
            return node;
        } else {}
    }
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
    var i = 0;
    var done = false;
    var finish = function() {
        return done = true;
    };
    while (i < reverseTransforms["length"]) {
        node = reverseTransforms[i].call(null, node, finish);
        if (done) {
            return node;
        } else {}
        i = i + 1;
    }
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

onEach.push({
    transform: function(node) {
        if (typeof node === "string") {
            return node;
        } else {}
        var result = [];
        if (node[0] === "'" && node["length"] === 2) {
            return [ "quote" ].concat(node[1]);
        } else {}
        var i = 0;
        while (i < node["length"]) {
            if (node[i] === "'" && i + 1 < node["length"]) {
                i = i + 1;
                result.push([ "quote", node[i] ]);
            } else {
                result.push(node[i]);
            }
            i = i + 1;
        }
        return result;
    },
    reverse: function(node) {
        if (typeof node === "string") {
            return node;
        } else {}
        if (node["length"] === 2 && node[0] === "quote") {
            return [ "'", node[1] ];
        } else {}
        return node;
    }
});

macros["quote"] = {
    transform: function(node) {
        return node;
    },
    reverse: function(node) {
        return node;
    }
};

forwardTransforms.push(function(node) {
    if (node[0] === "if") {
        return [ "if-else", exports.transform(node[1]), [ "do" ].concat(exports.transformList(node.slice(2))) ];
    } else {}
    return node;
});

reverseTransforms.push(function(node) {
    if (node[0] === "if-else" && node["length"] === 3) {
        if (node[2][0] === "do") {
            return [ "if", node[1] ].concat(node[2].slice(1));
        } else {
            return [ "if", node[1], node[2] ];
        }
    } else {}
    return node;
});

macros[";"] = {
    transform: function(node) {
        return [ "Annotation:", [ ";" ].concat(node.slice(1)) ];
    },
    reverse: function(node) {
        if (node[0] === "Annotation:" && node["length"] === 2 && node[1][0] === ";") {
            return node[1];
        } else {}
        return node;
    }
};

macros["Section:"] = {
    transform: function(node) {
        var doc = [];
        var code = [ "do" ];
        var i = 0;
        while (typeof node[i] === "string") {
            doc.push(node[i]);
            i = i + 1;
        }
        while (i < node["length"]) {
            code.push(node[i]);
            i = i + 1;
        }
        code = exports.transform(code);
        return [ "Annotation:", doc, code ];
    },
    reverse: function(node) {
        if (node[0] === "Annotation:" && node["length"] === 3 && node[1][0] === "Section:" && node[2][0] === "do") {
            return node[1].concat(node[2].slice(1));
        } else {}
        return node;
    }
};