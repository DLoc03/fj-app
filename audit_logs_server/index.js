import { app } from "./app.js";
import { env } from "./src/configs/env.config.js";
import { CONNECT_DB } from "./src/configs/db.config.js";

CONNECT_DB();

app.listen(env.PORT || 5050, () => {
  console.log(`Audit log server is running on ${env.HOST}:${env.PORT}`);
});
