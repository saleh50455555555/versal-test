const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://saleh:ooD5k9EhTT6JWqYQ@cluster0.otqqhpt.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('connected to DB');


    })
    .catch(() => {
        console.log(' unable to  connected to DB');


    })