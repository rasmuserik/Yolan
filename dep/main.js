var engine = module.require("./yolan")["engine"];

var run = function(args) {
    var moduleName = args[0] || engine + "main";
    return module.require("./" + moduleName)["run"].apply(null, args.slice(1));
};

exports["run"] = run;

if (engine === "node") {
    exports.run(process["argv"].slice(2));
} else {}