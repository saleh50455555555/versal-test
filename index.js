const express = require('express');
const db = require('./src/db')
const app = express();
//const { users, name1 } = require('./my-data');
const { users, name1 } = require('./module1');

// app.get('/api/:user', (req, res) => {
//     console.log(req.params);
//     let { userId } = req.params;
//     console.log(userId);
//     const fUser = users.find((user) => users.userId === Number(userId));
//     res.json(fUser);
//     //  res.json(req.params);

// })
const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time);
    next();

}

app.get('/api/v1/query', (req, res) => {

    console.log(req.query);
    const { search, limit } = req.query
    let sUsers = [...users];
    if (true) {
        sUsers = sUsers.filter((user) => {
            return user.firstName.startsWith(search.toUpperCase());
        })
    }//oihohi
    res.status(200).json(sUsers);
    // res.json("hi there");
})
app.get('/', logger, (req, res) => {
    console.log('Home');
    res.send('Home');
})
app.get('/about', logger, (req, res) => {
    console.log('about');
    res.send('abouttt');
})
const data1 = {
    placeId: 1,
    name: "armman",
    description: "otel",
    location: "allepo",
    averagerating: 5,
}
const data2 = {
    placeId: 2,
    name: "tercwas",
    description: "resturant",
    location: "allepo",
    averagerating: 5,
}
const data3 = {
    placeId: 3,
    name: "sheraton",
    description: "otel",
    location: "allepo",
    averagerating: 5,

}
app.get('/api/1', logger, (req, res) => {
    console.log('about');
    res.json(data1);
})

app.get('/api/2', logger, (req, res) => {
    console.log('about');
    res.json(data2);
})

app.get('/api/3', logger, (req, res) => {
    console.log('about');
    res.json(data3);

})

app.listen(8080 || process.env.PORT, () => {
    console.log('server on 5000');

})



//ooD5k9EhTT6JWqYQ