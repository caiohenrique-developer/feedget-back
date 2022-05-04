import express from "express";

const app = express();

app.get("/apenas-uma-rota-qualquer-para-teste", (req, res) => {
  return res.send("rota para teste executada");
});

app.listen(3333, () => {
  console.log("Server started on port 3333 🖥️");
});
