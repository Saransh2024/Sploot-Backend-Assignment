const dotenv = require("dotenv");

dotenv.config();
const express = require("express");
const morgan = require("morgan");

const bodyparser = require('body-parser');
const { connect } = require("http2");


const connectDB = require("./config/db");
const app = express();
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(express.static("./uploads"));

app.use(express.json());
app.use(morgan("tiny"));
app.use(require("cors")());

app.use("/api", require("./routes/routes"));





// server configurations.
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDB();

  console.log(`server listening on port: ${PORT}`);
});
