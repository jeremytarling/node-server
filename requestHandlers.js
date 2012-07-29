var querystring = require("querystring");

function start(response, postData) {
  console.log("Request handler 'start' was called.");

  var body = '<html>\n'+
    '<head>\n'+
    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />\n'+ 
    '</head>\n'+
    '<body>\n'+
    '<form action="/upload" method="post">\n'+
    '<textarea name="text" rows="10" cols="60"></textarea><br />\n'+
    '<input type="submit" value="Submit text" />\n'+
    '</form>\n'+
    '</body>\n'+
    '</html>\n';
  
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You've sent the text: " + querystring.parse(postData).text);
  response.end();
}

exports.start = start;
exports.upload = upload;
