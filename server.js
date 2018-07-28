const express = require('express');
const fs = require('fs');
const hbs = require('hbs'); // adding the bandlebars -> https://handlebarsjs.com/
var app = express(); // here we initialize app vairable by calling express function

const port = process.env.PORT || 3000; // here we are going to declear the port
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');   // Using hbs as the default view engine requires just one line of code in your app setup. This will render .hbs files when res.render is called


//app.use() --> this is how we declear the middleware in express-nodejs
app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+ '\n',(err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next(); // it defines the next destination
});


/*
// here i m going to write the middleware for Maintanance
app.use((req,res,next) => {
  res.render('maintanance.hbs'); // here after this line if we couldn't call next() then it will not execute the next lines...
});
*/

app.use(express.static(__dirname + '/playground')); // here we servet the help.html page by middleware.

// here this registerHelpers function takes two argument first the name of the helper and second the fuction which returns the value of the helper.
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('upperCaseIt',(text) =>{
  return text.toUpperCase();
});


// here get method takes two argument first the page path and second an arrow function.
app.get('/',(req,res) => {
/*
 res.send({
    name: 'dixit',
    middle: 'kumar',
    last: 'Bishwas'
  }); // here data send to the page by send().
  */
  res.render('home.hbs',{
    pageName: 'Home page',
    welcomeMsg: 'welcome to our website !'
  });
});

app.get('/about',(req,res) =>{
  res.render('about.hbs', {
    pageName: 'About Page',
    // currentYear: new Date().getFullYear() // for this we declear a helper function which we can access anywhere just calling it's name.
  }); // it will render the about.hbs page from view folder, here the second agument  in the render function passes the data in the about.hbs page
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, ()=>{
  console.log(`App is running on the port ${port}`);
}); // here we bind the app with port of the machine.
