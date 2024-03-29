const express = require ("express");
const app =  express();
const { getFirebase } = require("./utils/firebase");
const fs = require("fs");

const db = getFirebase().database();

//rotas
const rVideos = require("./videos");
const rHome = require("./home");

app.use("/video", rVideos);
app.use("/home", rHome);

app.use(express.static('/site/'));


app.use((req, res, next) =>{
db.ref("/codes videos").once("value", snap =>{
   var html = fs.readFileSync("./site/home.html", "utf-8");
   var keys = Object.keys(snap.val());
   var divVideos = getDivVideos(keys, snap.val());
   
   html = html.replace("%videos-vgapp",divVideos );
   res.set("Content-type", "text/html");
   res.send(Buffer.from(html));
  });
});


app.use((error,req, res, next)=>{
  res.status(error.status || 500);
  return res.send({
    error: error.message
  });
  console.log(error)
});


function getDivVideos(keys, json){
  var divV = "";
  for(var i = 0; i < keys.length; i++){
     var video = json[keys[i]];
     var idV = video.url_v.replace("https://youtu.be/", "");
     divV += `
  <div class="${generateClass()}">
    <div onclick="window.open('https://vgapp-site.herokuapp.com/video?id=${idV}','_self')" style="background:#dddbe6;padding:8px;margin-style:solid;border-color:#bcbcbc;margin-bottom:20px;border-radius:5px;">
     <img src="https://i.ytimg.com/vi/${idV}/default.jpg"/><br>
     <p class="vidtitle">${video.nome_v}</p>
    </div>
  <div>
 
`
  }
  return divV;
}

function generateClass() {
  return 'yxxx-xxxxx-xxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
module.exports = app;
