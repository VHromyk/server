import mongoose from "mongoose";
import app from "./index.js";

const {DB_HOST, PORT=5000} = process.env;

mongoose.connect(DB_HOST).then(()=> {
    app.listen(PORT, ()=> console.log(`Server is running on port: ${PORT}`))
}).catch((e)=> {
    console.log(e.message);
    process.exit(1)
})