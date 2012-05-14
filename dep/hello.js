var yolan = module.require("./yolan");

exports["run"] = function(args) {
    yolan.log("hello");
    return module.require("./yolan").readTextFile("src/hello.yl", function(err, result) {
        return yolan.log(result);
    });
};