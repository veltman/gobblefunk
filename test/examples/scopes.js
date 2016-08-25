function c(d, e) {

  var x = {
    value: 5
  };

  function f() {
    return Math.abs(d);
  }

  function g() {
    var d = 15;
    return d - e;
  }

  var h = function(){
    return f(x.value);
  };

  return f() + g() + h() + x["value"];

}

module.exports = c(5, 5);
