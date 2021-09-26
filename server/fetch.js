var MongoClient = require('mongodb').MongoClient;
var mongourl = 'mongodb://192.168.17.52:27050/db_resort';
var path = require('path');
const request = require("request")
var fs = require('fs');


var udb=null;
initDB();
function initDB(){
  MongoClient.connect(mongourl, function(err, db) {
    udb=db.db('db_resort');
  });
}

run();
function run(){
  var now = new Date().getTime();
  var left = 910000 - now%900000;
  console.log('left seconds:'+left)
  setTimeout(function(){
    fetchData();
    setTimeout(function(){
      run()
    },1000)
  },left)
}

var listbody = "";
function getlist(){
  return listbody;
}
function fetchData(){
  var nowhours = new Date().getHours();
  if(nowhours<9||nowhours>21){
    return;
  }
  console.log('now fetching data:');
  var url = 'https://gw.app.universalbeijingresort.com/attraction/list?sort_type=0&support_express=0&suitable_children=0&accessibility=0&page=1&page_size=1000';
  var url2 = 'http://13.113.185.34:6660/url?url='+encodeURIComponent(url);
  console.log(url2);
  request({
    url: url2,
    //proxy: 'https://127.0.0.1:1080',
    method: "GET",
    headers:{
      'Content-Type':'application/json'
    }
  }, function(error, response, body){
    if(error&&error.code){
      console.log('pip1e error catched!')
      console.log(error);
    }else{
      var listjson = eval('('+body+')');
      listjson.ts = new Date().getTime()
      listbody = JSON.parse(listjson);
      var cl_beijing_universal = udb.collection('cl_beijing_universal');
      var data = eval('('+body+')');
      var list = data.data.list;
      var now = new Date();
      var day = now.getDay();
      var hour = now.getHours();
      var min = now.getMinutes();
      var dd = Math.floor(now/86400000)
      for(var i=0;i<list.length;i++){
        var ud = list[i];
        var area = ud.area;
        var id = ud.id;
        var _id = id + "_" + dd + "_" + hour + "_" + min;
        var subtitle = ud.subtitle;
        var title = ud.title;
        var label = ud.label;
        var waiting_time = ud.waiting_time;
        var ss = {'_id':_id,id:id,area:area,label:label,subtitle:subtitle,title:title,waiting_time:waiting_time,day:day,date:dd,hour:hour,min:min,ts:now.getTime(),time:now};
        cl_beijing_universal.insert(ss,function(err){
          console.log(err);
        });

      }
    }
  })
}

module.exports={
  getlist
}