const express = require ("express");
const app =  express();
const { getFirebase } = require("./utils/firebase");

const fb = getFirebase();

const rVideos = require("./videos");
app.use("/videos", rVideos)

app.use(express.static('/site/'));


app.use((req, res, next) =>{
  res.status(404).send({
    info:{
      status:'erro 404. verifique a url se esta correto'
    }
  });
});


app.use((error,req, res, next)=>{
  res.status(error.status || 500);
  return res.send({
    error: error.message
  });
  console.log(error)
});


module.exports = app;