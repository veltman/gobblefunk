module.exports = function(){
  try {
    JSON.parse($);
  } catch(e) {
    if (e instanceof ReferenceError) {
      return 25;
    }
  }
}();
