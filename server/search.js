var MongoClient = require('mongodb').MongoClient;
var mongourl = 'mongodb://192.168.17.52:27050/db_resort';
var path = require('path');
var request = require("request");
var fs = require('fs');


var udb=null;
initDB();
function initDB(){
  MongoClient.connect(mongourl, function(err, db) {
    udb=db.db('db_resort');
  });
}


function getWaiting(date,id,callback){
  var cl_beijing_universal = udb.collection('cl_beijing_universal');
  cl_beijing_universal.find({id:id,date:date,hour:{'$gte':9,'$lte':21}}).toArray(function(err,result){
    callback(result);
  })
}

module.exports={
  getWaiting
}

