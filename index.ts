import { connectToDB } from "./src/config/dbConnection";
import { env } from "./src/utils/env";
import app from "./src/utils/server";

app.listen(env.port, async () => {
  connectToDB()
    .then(() => {
      console.log(
        `Server is running on port ${env.port} and succeful connected to db`
      );
    })
    .catch((err) => {
      console.log(err.message);
    });
});
