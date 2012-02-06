(function() {
  var root, start;
  start = function() {
    return console.log("Request Handler for Start Called");
  };
  root = function(e) {
    return console.log("Root Called");
  };
}).call(this);
