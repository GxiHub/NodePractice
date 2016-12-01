//var http = require('http');
express = require('express');
bodyParser = require('body-parser');
MongoClient = require('mongodb').MongoClient;
MongoEmployee= require('mongodb').MongoClient;
path = require('path');
moment = require('moment');
database = require('./db');

app = express();

//app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));

app.engine('html', require('ejs').renderFile);

var db;
var db_employee;

MongoEmployee.connect('mongodb://_dejuice:mini0306@ds157987.mlab.com:57987/dejuice', function(err, database){
  if (err) return console.log(err);
  db = database;
  app.listen(8080, function(){
    console.log('listening on 8080');
  })
}) 

MongoClient.connect('mongodb://dejuice_employee:mini0306@ds157487.mlab.com:57487/dejuice_employee', function(err, databaseEmployee){
  if (err) return console.log(err);
  db_employee = databaseEmployee;
}) 

// Create (POST) - Make something
app.post('/WorkHours/',function(req,res){
    db_employee.collection('dejuice_employee').save({timeID:Date.now(),year:req.body.year,month:req.body.month,day:req.body.day,hour:req.body.hour,minute:req.body.minute,worktype:req.body.worktype,employee_name:req.body.employee_name},function(error,result){
      if(error)return console.log (error);
      console.log('saved to database');
    });
    db_employee.collection('dejuice_employee').find().toArray(function(err, results) {
      res.render('EmployeeSalary.ejs',{dejuice_employee:results});
    });
});

// Create (POST) - Make something
app.post('/running_account/',function(req,res){
    db.collection('_dejuice').save({timeID:Date.now(),year:req.body.year,month:req.body.month,day:req.body.day,income:req.body.income,class:req.body.class,number:req.body.number,amount:req.body.amount,item:req.body.item,note:req.body.note},function(error,result){
      if(error)return console.log (error);
      console.log('saved to database');
    });
  res.redirect('/');
});

// Read (GET) - Get something
app.get('/',function(req,res){
	db.collection('_dejuice').find().toArray(function(err, results) {
  		res.render('index.ejs',{_dejuice:results});
	});
});

app.post('/WorkHours/Check/',function(req,res){
  db_employee.collection('dejuice_employee').find().toArray(function(err, results) {
      res.render('EmployeeSalary.ejs',{dejuice_employee:results});
  });
});

// Delete (DELETE) - Remove something
app.post('/delete/', (req, res) => {
  console.log('delete once  = ',req.body.timeID);
  //db.collection('_dejuice').findOneAndDelete({name:parseInt(req.body.timeID,10)},
  db.collection('_dejuice').findOneAndDelete({timeID:parseInt(req.body.timeID,10)},
  (err, result) => {
    if (err) return res.send(500, err);
     res.redirect('/');
  });
});

// Delete (DELETE) - Remove something
app.post('/delete/EmployeeSalary/', (req, res) => {
  console.log('delete work employee salary  = ',req.body.timeID);
  db_employee.collection('dejuice_employee').findOneAndDelete({timeID:parseInt(req.body.timeID,10)},
  (err, result) => {
    if (err) return res.send(500, err);
    db_employee.collection('dejuice_employee').find().toArray(function(err, results) {
      res.render('EmployeeSalary.ejs',{dejuice_employee:results});
    });
  });
});

// Change (CHANGE) - change something
app.post('/update', (req, res) => {
  console.log('update once = ',req.body.beefitem);
  console.log('update once = ',req.body.timeID);
  db.collection('_dejuice').findOneAndUpdate({timeID:parseInt(req.body.timeID,10)},{
    $set: 
    {
      name: req.body.beefitem
    }
  },{
      sort: {_id: -1},
      upsert: false
  },(err, result) => {
    if (err) return res.send(err)
    res.redirect('/');

  });
});

