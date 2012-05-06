yolan = {};

if (typeof exports === "undefined") {
    exports = yolan;
} else {
    yolan = exports;
}

if (!(typeof module === "undefined")) {
    module["exports"] = yolan;
} else {}

var engine = undefined;

if (!(typeof process === "undefined")) {
    engine = "node";
} else {}

if (typeof java === "object") {
    engine = "rhino";
    if (typeof require === "undefined") {
        var modules = {
            "./yolan": yolan
        };
        require = function(name) {
            if (!modules[name]) {
                console.log("loading module", name);
                var prevModule = module;
                var prevExports = exports;
                module = {};
                exports = {};
                module["exports"] = exports;
                module["require"] = require;
                Function.call(null, readFile.call(null, "build/" + name + ".js")).call();
                modules[name] = module["exports"];
            } else {}
            return modules[name];
        };
        console = {};
        console["log"] = function() {
            return print.call(null, Array["prototype"]["slice"].call(arguments, 0).join(" "));
        };
        module = {};
        module["require"] = require;
    } else {}
} else {}

if (!(typeof navigator === "undefined")) {
    var loadedModules = {
        yolan: yolan
    };
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
    yolan["readTextFile"] = function(fname, callback) {
        return module.require("fs").readFile(fname, "utf8", callback);
    };
} else {}

if (engine === "web") {
    yolan["readTextFile"] = function(fname, callback) {
        var req = new XMLHttpRequest;
        req["onreadystatechange"] = function(event) {
            if (req["readyState"] === 4) {
                if (!(req["status"] === 200)) {
                    return callback.call(null, {
                        err: "Request error: status not 200 OK",
                        req: req
                    });
                } else {}
                callback.call(null, null, req["responseText"]);
            } else {}
            return undefined;
        };
        req.open("GET", "/readTextFile/" + fname, true);
        return req.send(null);
    };
} else {}

if (engine === "node") {
    yolan["writeTextFile"] = function(fname, content, callback) {
        return module.require("fs").writeFile(fname, content, "utf8", callback);
    };
} else {}

if (engine === "web") {
    yolan["writeTextFile"] = function(fname, data, callback) {
        var req = new XMLHttpRequest;
        req["onreadystatechange"] = function(event) {
            if (!callback) {
                return;
            } else {}
            if (req["readyState"] === 4) {
                if (!(req["status"] === 200)) {
                    return callback.call(null, {
                        err: "Request error: status not 200 OK",
                        req: req
                    });
                } else {}
                callback.call(null, null);
            } else {}
            return undefined;
        };
        req.open("POST", "/writeTextFile/" + fname, true);
        return req.send(data);
    };
} else {}

if (engine === "node") {
    yolan["nextTick"] = process["nextTick"];
} else {
    yolan["nextTick"] = function(f) {
        setTimeout.call(null, f, 0);
    };
}

yolan["arrayHasMember"] = function(array, member) {
    if (array.indexOf(member) === -1) {
        return false;
    } else {
        return true;
    }
};