var Foswig = require("foswig"),
    tokenize = require("./tokenize.js"),
    chain = new Foswig(3);

chain.addWordsToChain(require("./words.json"));

module.exports = function() {

  var reserved = ["break", "case", "catch", "class", "const", "continue", "debugger", "default", "delete", "do", "else", "export", "extends", "finally", "for", "function", "if", "import", "in", "instanceof", "new", "return", "super", "switch", "this", "throw", "try", "typeof", "var", "void", "while", "with", "yield", "implements", "interface", "let", "package", "private", "protected", "public", "static", "null", "true", "false", "abstract", "boolean", "byte", "char", "double", "final", "float", "goto", "int", "long", "native", "short", "synchronized", "throws", "transient", "volatile", "await", "enum"],
      fn = function(name) {
        var tokenized = tokenize(name),
            newName;

        do {
          newName = generateName(tokenized);
        } while (reserved.indexOf(newName) >= 0);

        reserved.push(newName);
        return newName;

      };

  fn.reserved = function(_) {
    reserved = reserved.concat(_);
  };

  return fn;

};

function generateName(tokenized) {

  var name = "";

  tokenized.forEach(function(token){

    var word;

    if (/[0-9_$]/.test(token)) {
      name += token;
      return;
    }

    word = chain.generateWord(4, Math.max(12, token.length + 2), true, 100);

    // All caps
    if (token.toUpperCase() === token) {
      name += word.toUpperCase();
    } else if (token.length > 1 && token[0].toUpperCase() === token[0] && token.slice(1).toLowerCase() === token.slice(1)) {
      name += word[0].toUpperCase() + word.slice(1).toLowerCase();
    } else {
      name += word.toLowerCase();
    }

  });

  return name;

}
