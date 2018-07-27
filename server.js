const express = require('express');

var app = express(); // here we initialize app vairable by calling express function

// here get method takes two argument first the page path and second an arrow function.
app.get('/',(req,res) => {
  res.send({
    name: 'dixit',
    middle: 'kumar',
    last: 'Bishwas'
  }); // here data send to the page by send().
});

app.listen(3000); // here we bind the app with port of the machine.
