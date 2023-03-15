const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const axios = require('axios');

app.use(express.json())

app.listen(port);

let DB = {}

app.get("/:id", (req, res) => {
  try {
    if (!DB[req.params.id]) {
      let data = {count: 1, name: req.params.id};
      DB[req.params.id] = data;
      res.json({status: 400, data});
    } else {
      let data = {count: ++DB[req.params.id].count, name: DB[req.params.id].name};
      DB[req.params.id] = data;
      res.json({status: 400, data});
    }
  } catch (e) {
    console.log(e);
    res.send({status: 500, error: 'server error'});
  }
});

app.post("/:id", async (req, res) => {
  try {
    let name = req.query.name;

    if (!DB[req.params.id]) {
      let data = {count: 1, name};
      DB[req.params.id] = data;
      let rev = await axios.post(`https://next-poc-nine.vercel.app/api/revalidate?page=${req.params.id}`);
      res.json({status: 400, data});
    } else {
      let data = {count: ++DB[req.params.id].count, name};
      DB[req.params.id] = data;
      let rev = await axios.post(`https://next-poc-nine.vercel.app/api/revalidate?page=${req.params.id}`);
      res.json({status: 400, data});
    }

  } catch (e) {
    console.log({e});
    res.send(e);
  }
});
