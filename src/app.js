const express = require("express");
const path = require("path");
const musicList = require("../musics/musicList.json");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

/*
/music/:name?type=url
/music/:name?type=name
/music/:name?type=artist
/music/:name?type=cover
*/
app.get("/music/:music_uri", (req, res) => {
  const music_uri = req.params.music_uri;
  const type = req.query.type;
  const music = musicList.find((music) => music.uri === music_uri);
  if (!music) {
    res.status(404).send("Music not found");
  }
  const { lrc, url, cover } = music.data;
  switch (type) {
    case "url":
      res.sendFile(path.join(__dirname, "../musics", url));
      break;
    case "cover":
      res.sendFile(path.join(__dirname, "../musics", cover));
      break;
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
