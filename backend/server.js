import express from "express";

const app = express();
const PORT = 5001;

app.get('/api/notes', (req, res) => {
  res.send("message");
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
