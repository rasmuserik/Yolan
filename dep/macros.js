var yolan = module.require("./yolan");

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
    node = node.map(exports["transform"]);
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
    node = node.map(exports["reverse"]);
    return node;
};

exports["reverseList"] = function(list) {
    return list.map(exports["reverse"]);
};

var builtins = [ "return", "fn", "do", "def", "set", "new-object", "try-catch", "while", "if-else", "Annotation:", "return", "quote" ];

forwardTransforms.push(function(node) {
    if (node["length"] < 2 || !(node[1][0] === "quote") || yolan.arrayHasMember(builtins, node[0])) {
        return node;
    } else {}
    console.log("here", node);
    while (2 < node["length"] && node[1]["length"] === 2 && node[1][0] === "quote") {
        node = [ [ node[0], "get", node[1] ] ].concat(node.slice(2));
    }
    if (1 < node["length"] && node[1][0] === "quote") {
        node = [ node[0], "get", node[1] ];
    } else {}
    return node;
});

forwardTransforms.push(function(node, finish) {
    if (node[0] === "'" && node["length"] === 2) {
        finish.call();
        return [ "quote" ].concat(node[1]);
    } else {}
    var result = [];
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
});

reverseTransforms.push(function(node) {
    if (node["length"] === 2 && node[0] === "quote") {
        return [ "'", node[1] ];
    } else {}
    return node;
});

forwardTransforms.push(function(node, finish) {
    if (node[0] === "quote") {
        finish.call();
    } else {}
    return node;
});

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

forwardTransforms.push(function(node, finish) {
    if (node[0] === ";") {
        finish.call();
        return [ "Annotation:", node ];
    } else {}
    return node;
});

reverseTransforms.push(function(node, finish) {
    if (node[0] === "Annotation:" && node["length"] === 2 && node[1][0] === ";") {
        finish.call();
        return node[1];
    } else {}
    return node;
});

forwardTransforms.push(function(node, finish) {
    if (node[0] === "Section:") {
        finish.call();
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
    } else {}
    return node;
});

reverseTransforms.push(function(node) {
    if (node[0] === "Annotation:" && node["length"] === 3 && node[1][0] === "Section:" && node[2][0] === "do") {
        return node[1].concat(node[2].slice(1));
    } else {}
    return node;
});

var x = {
    a: 1
};