(function() {
  var handle, requestHandler, router, server;
  server = require('./js/server');
  router = require('./js/router');
  requestHandler = require('./js/requestHandler');
  handle = {};
  handle["/"] = requestHandler.root;
  handle["/search"] = requestHandler.start;
  server.start(router.route, handle);
}).call(this);
