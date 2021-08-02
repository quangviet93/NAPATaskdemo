const express = require('express');
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/form-upload.html')
});

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const err = console.log('Please upload a file');
    return next(err);
  }
  res.send(file);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});