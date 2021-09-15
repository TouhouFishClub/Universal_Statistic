var MongoClient = require('mongodb').MongoClient;
var mongourl = 'mongodb://192.168.17.52:27050/db_resort';
var path = require('path');
var request = require("request");
var fs = require('fs');


var udb=null;
initDB();
function initDB(){
  MongoClient.connect(mongourl, function(err, db) {
    udb=db;
  });
}


function run(){
  setTimeout(function(){
    fetchData();
  },1000)
}
run();


function fetchData(){
  console.log('now fetching data:');
  var url = 'https://gw.app.universalbeijingresort.com/attraction/list?sort_type=0&support_express=0&suitable_children=0&accessibility=0&page=1&page_size=1000';
  request({
    url: url,
    method: "GET",
    headers:{
    }
  }, function(error, response, body){
    if(error&&error.code){
      console.log('pipe error catched!')
      console.log(error);
    }else{
      console.log(udb.collection);
      var cl_beijing_universal = udb.collection('cl_beijing_universal');
      console.log(body);
      var data = eval('('+body+')');
      var list = data.data.list;
      var now = new Date();
      var day = now.getDay();
      var hour = now.getHours();
      var min = now.getMinutes();

      for(var i=0;i<list.length;i++){
        var ud = list[i];
        var area = ud.area;
        var id = ud.material_id;
        var subtitle = ud.subtitle;
        var title = ud.title;
        var waiting_time = ud.waiting_time;
        var ss = {id:id,area:area,subtitle:subtitle,title:title,waiting_time:waiting_time,day:day,hour:hour,min:min,ts:now.getTime(),time:now};
        cl_universal.save(ss);

      }
    }
  })
}