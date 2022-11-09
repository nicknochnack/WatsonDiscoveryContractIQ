const express = require("express");

const app = express();

app.use(express.json());

app.get("/sup", (req, res) => {
  res.send("Hello World");
});
app.use("/api/watson", require("./routes/api/watson"));

const PORT = process.env.PORT || 5010;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
