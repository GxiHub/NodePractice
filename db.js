MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect('mongodb://gxi0306:mini0306@ds017248.mlab.com:17248/star-wars-quotes', function(err, database){
  db = database;
  if (err) return console.log(err);
}) 

exports.timeset = function(req,callback){
	var in_stock_time = moment().subtract(10,'day').calendar();
	var totalprice = Math.round(req.body.weight*req.body.price,10)
	var docs = [];
	docs.push(in_stock_time);
	docs.push(totalprice);
	callback(null, docs);
 	db.collection('quotes').save({timeID:Date.now(),year:req.body.year,month:req.body.month,day:eq.body.day,income:req.body.income,amount:req.body.income,number:req.body.number,item:req.body.item,not:req.body.note},function(err,result){
		if(err)return console.log(err);
		console.log('save data to database via timeset()');
	});
	
}
