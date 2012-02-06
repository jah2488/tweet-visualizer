(function() {
  var route;
  route = function(handle, pathname) {
    console.log("Routing request for " + pathname);
    if (handle[pathname]) {
      return handle[pathname]();
    } else {
      return console.log("No request handler found for " + pathname);
    }
  };
  exports.route = route;
}).call(this);
