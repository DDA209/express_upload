const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'public/uploads/'});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

const nodePort = process.env.PORT || 3000;
const mongoPort = 27017;

/**
 * Initialisation de la base de donnée
 */ 
(async () => {
    const dbConnect=await mongoose.connect(`mongodb://localhost:${mongoPort}/`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`Database connectée sur le port ${mongoPort}`);

    const User = new mongoose.Schema({
        username: {
            index: true,
            type: String
        },
        firstname: String,
        lastname : String,
        profilePicture: String
    });

})();


app.get('/', (req, res) => {
    console.log('GET /');
    res.render('home')
    // res.send("<h1>Du premier coup</h1>")
});

app.post('/upload', upload.single('picture'), (req, res) => {
    console.log('POST /upload');
    console.log('POST /upload req.file', req.file);
    console.log('POST /upload req.body', req.body);
    res.send(`
    <div>
        <p>
            ${req.body.firstname} ${req.body.lastname} a été inscrit en tant que ${req.body.username}
        </p>
    <div>
    <div>
        <p>
            revenir à la <a href="/">page d'inscription</a>
        </p>
    </div>`);

});

app.listen(nodePort, () => {
    console.log(`Serveur connecté sur le port ${nodePort}`);
});