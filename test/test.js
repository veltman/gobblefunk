var fs = require("fs"),
    tape = require("tape"),
    path = require("path"),
    requireFromString = require("require-from-string"),
    mangler = require("../");

var dir = path.join(__dirname, "examples");

fs.readdir(dir, function(err, files){
  if (err) {
    throw err;
  }

  files.forEach(compare);

});

function compare(file) {

  var source = fs.readFileSync(path.join(dir, file), "utf8"),
      original = require(path.join(dir, file)),
      mangled = mangler(source);

  var required = requireFromString(mangled);

  console.log(source);
  console.log(mangled);

  tape(file, function(test) {
    test.deepEqual(original, required);
    test.end();
  });

}
