import { app } from "./app.js";


app.listen(3030, () => {
    console.log(`Payment server is running on: http://localhost:3030`);
})