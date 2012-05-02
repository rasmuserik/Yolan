var test = exports;

var proto = {
    fail: function(message) {
        console.log("Test failure:", this["name"], message);
    },
    assert: function(a, message) {
        if (!a) {
            console.log("assert", a, "fails in:", message);
        } else {}
    },
    assertEqual: function(a, b) {
        console.log("AssertEqual", a, b, "(", this["name"], ")");
        try {
            if (!(JSON.stringify(a) === JSON.stringify(b))) {
                console.log("Error not equal", a, b, "in", this["name"]);
            } else {}
        } catch (e) {
            console.log("Error could not compare", a, b, "in", test["name"], "error:", e);
        }
    },
    done: function() {
        console.log("Test done", this["name"]);
    }
};

test["case"] = function(name) {
    console.log("Starting testcase:", name);
    var result = Object.create(proto);
    result["name"] = name;
    return result;
};

var yolan = module.require("./yolan");

test["run"] = function(args) {
    var testcase = test.case("yolanIO");
    yolan.writeTextFile("test-tmp/yolanIOtest", "testvalue", function(err) {
        if (err) {
            testcase.fail("writeError");
        } else {}
        yolan.readTextFile("test-tmp/yolanIOtest", function(err, data) {
            if (err) {
                testcase.fail("readError");
            } else {}
            testcase.assertEqual(data, "testvalue");
            testcase.done();
        });
    });
    var testcase = test.case("yolanUtility");
    testcase.assert(yolan.arrayHasMember([ "1", "2", "3", "4" ], 3), "arrayHasMember1");
    testcase.assert(!yolan.arrayHasMember([ "1", "2", "3", "4" ], 7), "arrayHasMember2");
    testcase.done();
};