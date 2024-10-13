const exp = require('express');
const app = exp();
const cors = require('cors')
require('dotenv').config();
const mongodb = require('mongodb').MongoClient;
const userapp = require('./Apis/userapi');
const path=require('path')

app.use(cors());
// Middleware to parse incoming JSON requests
app.use(exp.json());



// app.use(exp.static(path.join(__dirname,'../client/build')))

mongodb.connect(process.env.CONNECTINGURL)
    .then(client => {
        // Get the database
        const socialappdb = client.db('socialappdb');
        // Get the collections
        const userscollection = socialappdb.collection('userscollection');
        const postscollection = socialappdb.collection('postscollection');
        const friendscollection = socialappdb.collection('friendscollection');
        // Make the collections available to all routes
        app.set('userscollection', userscollection);
        app.set('postscollection', postscollection);
        app.set('friendscollection',friendscollection);
    })
    .catch(err => console.log('Error in DB connection', err));

// Set the user-api route
app.use('/user-api', userapp);

// app.use((req,res,next)=>{
//     res.sendFile(path.join(__dirname,'../client/build/index.html'))
// })

const port = process.env.PORT || 5000; // Add a default port if environment variable is missing
app.listen(port, () => {
    console.log('Server running on port ', port);
});
