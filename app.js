const express = require ("express");
const app =  express();
const { getFirebase } = require("./utils/firebase");
const fs = require("fs");

const fb = getFirebase();

//rotas
const rVideos = require("./videos");
const rHome = require("./home");

app.use("/videos", rVideos);
app.use("/home", rHome);

app.use(express.static('/site/'));


app.use((req, res, next) =>{
      res.set("Content-Type", "text/html");
      var html = fs.readFileSync("./site/not_found.html", "utf-8");
      res.send(Buffer.from(html)); 
});


app.use((error,req, res, next)=>{
  res.status(error.status || 500);
  return res.send({
    error: error.message
  });
  console.log(error)
});


module.exports = app;