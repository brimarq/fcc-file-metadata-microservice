'use strict';

const express = require('express');
const cors = require('cors');
const multer  = require('multer');
// Store uploaded files in memory https://github.com/expressjs/multer#memorystorage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

// Pass the upload.single function as inline middleware
app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  res.json({filename: req.file.originalname, bytes: req.file.size});
});

// 404 / Not found handler http://expressjs.com/en/starter/faq.html
app.use((req, res, next) => res.status(404).send("Not found."));

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
