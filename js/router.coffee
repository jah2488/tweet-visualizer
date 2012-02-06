

route= (handle, pathname) ->
  console.log("Routing request for " + pathname)

  if handle[pathname]
    handle[pathname]()
  else
    console.log("No request handler found for " + pathname)

exports.route = route