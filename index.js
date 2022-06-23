require('dotenv').config();
var cors = require('cors');

var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({storage: storage});

var express = require('express');
var app = express();

app.use(cors({optionsSuccessStatus: 200}));

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), function(req, res){

    if(req.file){
        res.send({name: req.file.originalname, type: req.file.mimetype, size: req.file.size});
    }else {
        res.send({error: "no file uploaded"});
    }
    
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
