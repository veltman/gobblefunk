// Tokenize variable name into snake/camel/titlecase pieces
module.exports = function(name) {

  var tokens = [],
      current = "";

  for (var i = 0, l = name.length; i < l; i++) {
    if (/[0-9_$]/.test(name[i])) {
      if (current) {
        tokens.push(current);
        current = "";
      }
      tokens.push(name[i]);
    } else if (name[i].toUpperCase() === name[i]) {
      if (current && current[current.length - 1].toUpperCase() === current[current.length - 1]) {
        current += name[i];
      } else {
        if (current) {
          tokens.push(current);
        }
        current = name[i];
      }
    } else {
      current += name[i];
    }
  }

  if (current) {
    tokens.push(current);
  }

  return tokens;

};
