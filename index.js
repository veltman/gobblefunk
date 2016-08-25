var babylon = require("babylon"),
    generate = require("babel-generator").default,
    traverse = require("babel-traverse").default,
    gobblefunk = require("./lib/gobblefunk.js")();

module.exports = function(code) {

  var ast = babylon.parse(code),
      scopeChain = [],
      cache = {},
      renamings = [];

  traverse(ast, {
    enter: enter,
    exit: exit
  });

  function enter(path) {

    // Create new scope
    if (!scopeChain.length || path.scope !== scopeChain[0].scope) {
      scopeChain.unshift({
        scope: path.scope,
        creator: path.node,
        identifiers: {}
      });
    }

    if (path.node.type === "Identifier" && path.key !== "property" && path.node.name) {
      scopeChain[0].identifiers[path.node.name] = true;
    }

  }

  function exit(path) {

    var scope;

    // Leaving scope
    if (path.node === scopeChain[0].creator) {
      scope = scopeChain.shift();

      Object.keys(scope.identifiers).forEach(function(name){

        var bindingScope = scope.scope;

        do {
          if (bindingScope.hasOwnBinding(name)) {
            if (!cache[name + bindingScope.uid]) {
              cache[name + bindingScope.uid] = true;
              renamings.push({ scope: bindingScope, name: name });
            }
            return;
          }
        } while (bindingScope = bindingScope.parent);

      });
    }

  }

  gobblefunk.reserved(renamings.map(function(pair){
    return pair.name;
  }));

  renamings.forEach(function(pair){
    pair.scope.rename(pair.name, gobblefunk(pair.name));
  });

  return generate(ast, {
    retainLines: true,
    compact: false
  }, code).code;

};
