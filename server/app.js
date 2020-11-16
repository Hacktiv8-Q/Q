if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
const express = require("express");
const router = require("./routes");
const cors = require("cors");
const errHandler = require("./middlewares/errHandler");

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(errHandler);

app.listen(port, () => console.log(`app is runnin on ${port}`));

module.exports = app;
