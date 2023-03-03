import app from "./server";
const port = process.env.PORT || 5000;

// creates and starts a server for our API on a defined port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
