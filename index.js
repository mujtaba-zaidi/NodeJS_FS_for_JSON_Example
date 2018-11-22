const express = require("express");
const fetch = require("node-fetch");
const fs = require("fs-extra");

const app = express();
app.use(express.json());
const server = require("http").createServer(app);

const port = 3000;

const writeTo = () => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.text())
    .then(body => {
      var users = [{ Users: JSON.parse(body) }];
      fs.writeJson("the_data.json", users, function(err) {
        if (err) throw err;
      });
    });
};

const readFrom = cb => {
  fs.readJson("./the_data.json").then(data => {
    cb(data);
  });
};

const insertTo = () => {
  readFrom(filesData => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.text())
      .then(body => {
        filesData.push({ Posts: JSON.parse(body) });
        fs.writeJson("the_data.json", filesData, function(err) {
          if (err) throw err;
        });
      });
  });
};

server.listen(port, () => {
  // writeTo();
  //   readFrom(data => {
  //     console.log(data);
  //   });
  insertTo();
  console.log("We are live on " + port);
});
