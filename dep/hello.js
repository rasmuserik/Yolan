console.log("in", "hello");

exports["run"] = function(args) {
    console.log("hello");
    return module.require("./yolan").readTextFile("src/hello.yl", function(err, result) {
        return console.log(result);
    });
};