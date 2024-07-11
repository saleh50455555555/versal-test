const http = require('http');
console.log('salekddfhhjhh');

const server = http.createServer((req, res) => {

    console.log(req);
    if (req.url === '/') {
        res.end('hi there you are in the home page');


    }
    else {
        if (req.url === '/saleh') {
            res.end('hello there u are in the about page ');

        }
        else {
            res.end(`
            <h1> ooooh roigh page   </h1>
            <p>dont do that again</p>
            <a href="/saleh"> to home</a>
          ` );
        }
    }
});
server.listen(5000);





