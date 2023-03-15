const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const axios = require('axios');

app.use(express.json())

app.listen(port);

let DB = {}

app.get("/:id", (req, res) => {
  try {
    const {id} = req.params;
    if (!DB[id]) {
      DB[id] = {count: 1, name: id};
      res.json({status: 400, data: DB[id]});
    } else {
      DB[id] = {...DB[id], count: ++DB[id].count};
      res.json({status: 400, data: DB[id]});
    }
  } catch (e) {
    console.log(e);
    res.send({status: 500, error: 'server error'});
  }
});

app.post("/:id", async (req, res) => {
  try {
    const {name} = req.query, {id} = req.params;
    if (!DB[id]) {
      DB[id] = {count: 1, name};
      await axios.post(`https://next-poc-nine.vercel.app/api/revalidate?page=${id}`);
      res.json({status: 400, data: DB[id]});
    } else {
      DB[id] = {...DB[id], name};
      await axios.post(`https://next-poc-nine.vercel.app/api/revalidate?page=${id}`);
      res.json({status: 400, data: DB[id]});
    }
  } catch (e) {
    console.log({e});
    res.send(e);
  }
});
