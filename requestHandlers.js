var querystring = require("querystring"),
  fs = require("fs"),
  formidable = require("formidable");

function start(response) {
  console.log("Request handler 'start' was called.");

  var body = '<html>\n'+
    '<head>\n'+
    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />\n'+ 
    '</head>\n'+
    '<body>\n'+
    '<form action="/upload" enctype="multipart/form-data" method="post">\n'+
    '<input type="file" name="upload" multiple="multiple">\n'+
    '<input type="submit" value="upload file" />\n'+
    '</form>\n'+
    '<p><a href="http://86.0.94.82/">home</a></p>\n'+
    '</body>\n'+
    '</html>\n';
  
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");

    fs.rename(files.upload.path, "/tmp/test.png", function(err) {
      if (err) {
        fs.unlink("/tmp/test.png");
        fs.rename(files.upload.path, "/tmp/test.png");
      }
    });
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<html><body><p>receved image</p>");
    response.write("<img src='/show' />");
    response.write("<p><a href=\"/start\">back to start</a></p></body></html>")
    response.end();
  });
}

function show(response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
