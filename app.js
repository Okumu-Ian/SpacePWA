const express = require('express');
const ejs = require('ejs');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = express.Router();


var sess;

var serviceAccount = require('firebase-details/spaceshare-253b9-firebase-adminsdk-ewx8s-cec1c0b60b.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://spaceshare-253b9.appspot.com"
});

var bucket = admin.storage().bucket();

let db  = admin.firestore();
let hostingCollection = "hostingSpaces";

var documentId;
var app = express();
app.set('view engine','ejs');

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

app.get('/',(req,res)=>{
    const hostedSpaces = [];
    let dataReference = db.collection(hostingCollection);
    let allData = dataReference.get()
        .then(
            snapShot => {
                snapShot.forEach(
                    doc => {
                      //  console.log(doc.id + " => "+doc.data().spaceName);
                    });
            })
               .catch(err => {
                    console.log("Error: "+ err);
            });
    res.render("hello.ejs",
    {message: "SpaceShare",
     copyright: "© 2019 Copyright Text"});
});

app.get('/authentication',(req,res)=>{
    res.render("authentication.ejs",{
        pageTitle: "SpaceShare"
    });
});

app.post('/registerLogin',(req,res) => {
    console.log(req.body);
    res.render("hello.ejs",{
        message: "SpaceShare",
        copyright: "© 2019 Copyright Text"
    });
});

app.get('/explore',(req,res) => {
    res.render(
        "hosted.ejs",{
            message: "Explore SpaceShare"
        });
});

app.post('/host_space',(req,res) => {
const hostingBody = req.body;
console.log(hostingBody);
db.collection(hostingCollection).add(hostingBody)
    .then(
        ref => {
            console.log(ref.id);
            documentId = ref.id;
        }
    );
res.render(
    "hello.ejs",{
        message: "SpaceShare",
        copyright: "© 2019 Copyright Text"
    });
});

app.get('/home',(req,res)=>{
    res.render("hello.ejs",{
        message: "SpaceShare"
    });
});

app.listen(3000,(res,err)=>{
console.log("Server listening here");
});