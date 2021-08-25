const express = require("express");
const router = express.Router();
const fs = require("fs");
const { getFirebase } = require("./utils/firebase");
const db = getFirebase().database();



router.get("/", (req, res) =>{
  var videoId = req.query.id;
  db.ref("/codes videos").once("value", snap =>{
    
    var keys = Object.keys(snap.val());

    if(videoIdExist(keys, snap.val(), videoId)){
      var video = getVideoInfo(keys, snap.val(), videoId);
      var codeV = "nenhum código utilizado no vídeo."
      if(video.code){
        codeV = video.code;
      }
      res.set("Content-Type", "text/html");
      var html = fs.readFileSync("./site/video.html", "utf-8");
      html = html.replace("%title", video.nome_v).replace("%title-video", video.nome_v);
      html = html.replace("%code", codeV).replace("%video-id", videoId);;
      res.send(Buffer.from(html));
      
    }else{
      res.set("Content-Type", "text/html");
      var html = fs.readFileSync("./site/not_found.html", "utf-8");
      res.send(Buffer.from(html));
      
    }
  
   
  });
 
});

function videoIdExist(keys, json, id){
  for(var i = 0; i < keys.length; i++){
    var idV = json[keys[i]].url_v.replace("https://youtu.be/", "");
    if(idV === id){
      return true;
    }
  }
  return false;
}

function getVideoCode(keys, json, id){
  for(var i = 0; i < keys.length; i++){
    var idV = json[keys[i]].url_v.replace("https://youtu.be/", "");
    var code = json[keys[i]].code;
    if(idV === id){
      return code;
    }
  }
  return "";
}
function getVideoInfo(keys, json, id){
  for(var i = 0; i < keys.length; i++){
    var idV = json[keys[i]].url_v.replace("https://youtu.be/", "");
    var info = json[keys[i]];
    if(idV === id){
      return info;
    }
  }
  return "";
}

module.exports = router;