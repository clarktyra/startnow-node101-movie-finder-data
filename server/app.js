var express = require('express');
var app = express();
var morgan = require('morgan');
var axios = require('axios');
let movieId;
let req;
var cache = {
url: null,
data: null
};

app.get('/', function (req, res) {
    //res.send('using express server');
    console.log(req.query);



if (req.query.i){
   // movieId = req.query.i;
   if (cache.url === req.query.i) {
   res.send(cache.data)
   }
    axios.get('http://omdbapi.com/?i=' + encodeURIComponent(req.query.i) + '&apikey=8730e0e')
        .then(response => {  
            cache.data = response.data
            cache.url = req.query.i
            res.json(response.data)  
       
        })
        .catch(err => res.json(err.message));
    }
// When making calls to the OMDB API make sure 
//to append the '&apikey=8730e0e' parameter

    else if (req.query.t){
            if (cache.url === req.query.t) {
            res.send(cache.data)
            }
         axios.get('http://omdbapi.com/?t=' + req.query.t + '&apikey=8730e0e')
            .then(response => {   
                cache.data = response.data
                cache.url = req.query.t
                res.json(response.data) 
//    if (req.query.t){
//     movieId = req.query.t;
//     };
            })
        .catch(err => res.json(err.message));
}
else res.json({});
app.use(morgan('dev'));
});
module.exports = app;
