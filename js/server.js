(function() {
  var http, start, url;
  http = require('http');
  url = require('url');
  start = function(route, handle) {
    var onRequest;
    onRequest = function(request, response) {
      var pathname, query;
      pathname = url.parse(request.url).pathname;
      query = url.parse(request.url).query;
      console.log("Request For " + pathname + " Received With Query : " + query);
      route(handle, pathname);
      response.writeHead(200, {
        "Content-Type": "text/plain"
      });
      response.write("Hello World");
      return response.end;
    };
    http.createServer(onRequest).listen(8888);
    return console.log("Server Running...");
  };
  exports.start = start;
}).call(this);
