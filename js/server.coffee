http = require('http')
url  = require('url')

start= (route, handle) ->

  onRequest= (request, response) ->
    pathname = url.parse(request.url).pathname
    query    = url.parse(request.url).query
    
    console.log("Request For " + pathname + " Received With Query : " + query);

    route(handle, pathname)

    response.writeHead( 200, {"Content-Type": "text/plain"})
    response.write("Hello World")
    response.end

  http.createServer(onRequest).listen(8888)
  console.log("Server Running...")

exports.start = start