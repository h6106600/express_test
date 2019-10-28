var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/mydb";
var url = "mongodb://qqq610660:h123868622@ds145952.mlab.com:45952/qqq001";
var collection = "users_data";

var insert_user = function(name,password,email){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var myobj = { name:name,password:password,email:email };
      db.collection(collection).insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("user inserted");
        db.close();
      });
    });
};

var check_user = function(name,callback){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection(collection).find({name:name}).toArray(function(err, result) {
      if (err) throw err;
      callback(result);
      db.close();
    });
  });
};

var check2_user = function(name,password,callback){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection(collection).find({name:name,password:password}).toArray(function(err, result) {
      if (err) throw err;
      callback(result);
      db.close();
    });
  });
};

var display_user = function(callback){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection(collection).find().toArray(function(err, result) {
      if (err) throw err;
      callback(result);
      db.close();
    });
  });
}

var delete_user = function(name){
  MongoClient.connect(url,function(err,db){
    if(err) throw err;
    var query = {name:name}
    db.collection(collection).deleteOne(query,function(err,obj){
      if (err) throw err;
      console.log(obj);
      db.close();
    });
  })
}

module.exports={
  insert_user:insert_user,
  check_user:check_user,
  check2_user:check2_user,
  display_user:display_user,
  delete_user:delete_user
}
