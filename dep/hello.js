exports["run"] = function(args) {
    console.log("hello");
    return module.require("./yolan").readTextFile("src/hello.yl", function(result) {
        return console.log(result);
    });
};