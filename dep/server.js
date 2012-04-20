var http = module.require("http");

var fs = module.require("fs");

var xml = module.require("./xml");

var scriptList = [ "yolan" ].concat(fs.readdirSync("src").filter(function(name) {
    return name.slice(-3) === ".yl";
}).map(function(name) {
    return name.slice(0, -3);
}));

var head = "<!DOCTYPE html><html>" + xml.fromYl(module.require("./htmlheader"));

var body = "<body><script>function define(_,_,f){f()};</script>" + scriptList.map(function(name) {
    return '<script src="' + name + '.js"></script>';
}).join("") + '<script>console.log("A",require("./yolan"));require("./yolan").run(location.hash.slice(1).split(" "));</script></body></html>';

exports["run"] = function() {
    http.createServer(function(request, result) {
        var url = request["url"];
        console.log(request["url"]);
        if (!(url.slice(-3) === ".js")) {
            result.writeHead(200, {
                "Content-Type": "text/html"
            });
            result.end(head + body);
        } else {}
        if (url.slice(-3) === ".js") {
            result.writeHead(200, {
                "Content-Type": "text/javascript"
            });
            var name = "." + url.slice(0, -3);
            fs.readFile("./src/" + name + ".yl", "utf8", function(err, data) {
                if (err) {
                    result.end("");
                } else {}
                return result.end('define("' + name + '",["require","exports","module"],function(require,exports,module){' + module.require("./compile").yl2js(data) + "});");
            });
        } else {}
        return true;
    }).listen(1234);
    return console.log([ "starting", "server", "on", "localhost", "port", "1234" ]);
};