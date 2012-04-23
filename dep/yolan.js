yolan = {};

var engine = undefined;

if (!(typeof process === "undefined")) {
    engine = "node";
} else {}

if (!(typeof java === "undefined")) {
    engine = "rhino";
} else {}

var loadedModules = {};

if (!(typeof navigator === "undefined")) {
    engine = "web";
    if (!window["require"]) {
        var modules = {};
        var require = function(name) {
            if (!loadedModules[name]) {
                console.log("initialising", name);
                var module = {};
                var exports = {};
                module["exports"] = exports;
                module["require"] = require;
                modules[name].call(null, require, exports, module);
                loadedModules[name] = module["exports"];
            } else {}
            return loadedModules[name];
        };
        window["define"] = function(name, dep, f) {
            modules[name] = f;
            return undefined;
        };
        console.log("def", "require");
        window["require"] = require;
    } else {}
} else {}

yolan["engine"] = engine;

if (typeof console === "undefined") {
    console = {};
    console["log"] = function() {
        return undefined;
    };
    if (!(typeof print === "undefined")) {
        console["log"] = print;
    } else {}
} else {}

if (!yolan["engine"]) {
    console.log("Error detecting engine:");
} else {}

if (engine === "node") {
    exports["readTextFile"] = function(fname, callback) {
        module.require("fs").readFile(fname, "utf8", callback);
        return function(err, data) {
            if (err) {
                return callback.call(null, {
                    err: err
                });
            } else {}
            return callback.call(null, data);
        };
    };
} else {}

if (engine === "web") {
    exports["readTextFile"] = function(fname, callback) {
        var req = new XMLHttpRequest;
        req["onreadystatechange"] = function(event) {
            if (req["readyState"] === 4) {
                if (!(req["status"] === 200)) {
                    return callback.call(null, {
                        err: "Request error: status not 200 OK",
                        req: req
                    });
                } else {}
                callback.call(null, req["responseText"]);
            } else {}
            return undefined;
        };
        req.open("GET", "/readTextFile/" + fname, true);
        return req.send(null);
    };
} else {}

if (!(typeof module === "undefined")) {
    module["exports"] = yolan;
} else {}