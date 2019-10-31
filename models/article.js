var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var collection = "article_content";

var insert_article = function(name,content,date){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var myobj = { name:name,article:content,date:date};
      db.collection(collection).insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("article inserted");
        db.close();
      });
    });
};

var find_article=function(callback){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection(collection).find({}).toArray(function(err, result) {
        if (err) throw err;
        callback(result);
        db.close();
      });
    });
};
module.exports={
  insert_article:insert_article,
  find_article:find_article
}
