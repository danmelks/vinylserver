//const sys = require('sys');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const exec = require('child_process').exec;

app.use(express.static('public'))
//app.use(bodyParser());

/*
app.get('/', function (req, res) {
  res.send('Hello World!')
})
*/





let child;

 
// default options 
app.use(fileUpload());
 
app.post('/upload', function(req, res) {
  let sampleFile;
 
  if (!req.files) {
    res.send('No files were uploaded.');
    return;
  }
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  sampleFile = req.files.sampleFile;
 
  // Use the mv() method to place the file somewhere on your server 
  sampleFile.mv('public/myfile.hpgl', function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log('code for script goes here')
      

      res.send('File uploaded!');

            // executes `pwd`
      child = exec("mysomoscript", function (error, stdout, stderr) {
        //sys.print('stdout: ' + stdout);
        //sys.print('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        } else {
          console.log('exec stdout: ' + stdout);
        }
      });
    }
  });
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
