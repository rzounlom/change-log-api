import * as dotenv from "dotenv";

import app from "./server.ts";
import config from "./config";

dotenv.config();

const port = process.env.PORT || 5000;

// creates and starts a server for our API on a defined port
app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
