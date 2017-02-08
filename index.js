const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const exec = require('child_process').exec;

app.use(express.static('public'));

var child;
 
app.use(fileUpload());
 
app.post('/upload', function(req, res) {
	var sampleFile;

	if (!req.files || !req.files.sampleFile) {
		res.send('No files were uploaded.');
		return;
	}

	sampleFile = req.files.sampleFile;

	sampleFile.mv('public/myfile.hpgl', function(err) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send('File uploaded!');

			child = exec("stty 9600 ixon ixoff -F /dev/ttyUSB0; cat public/myfile.hpgl > /dev/ttyUSB0", function (error, stdout, stderr) {
				if (error !== null)
					console.log('exec error: ' + error);
				else
					console.log('exec stdout: ' + stdout);
			});
		}
	});
});


app.listen(80, function () {
	console.log('Vinyl server listening on port 80!')
});
