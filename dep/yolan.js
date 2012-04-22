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

var run = function(args) {
    var moduleName = args[0] || engine + "main";
    return module.require("./" + moduleName)["run"].apply(null, args.slice(1));
};

yolan["run"] = run;

if (!(typeof module === "undefined")) {
    module["exports"] = yolan;
} else {}

if (engine === "node") {
    yolan.run(process["argv"].slice(2));
} else {}