const express = require('express');

var app = express(); // here we initialize app vairable by calling express function

app.use(express.static(__dirname + '/playground')); // here we servet the help.html page by middleware.

// here get method takes two argument first the page path and second an arrow function.
app.get('/',(req,res) => {
  res.send({
    name: 'dixit',
    middle: 'kumar',
    last: 'Bishwas'
  }); // here data send to the page by send().
});

app.get('/about',(req,res) =>{
  res.send('About page');
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, ()=>{
  console.log('App is running on the port 3000');
}); // here we bind the app with port of the machine.
