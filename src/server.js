require("dotenv").config();
// const Web3 = require("web3");
// const Provider = require('@truffle/hdwallet-provider');
// const truffle_connect = require("../src/services/blockchain.services.js");
const express = require("express");
const path = require("path");
const cors = require("cors");
const { connect } = require("./db/init");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(process.cwd(), "public")));

// setup CORS
app.use(
    cors({
        origin: "http://localhost:3001",
    })
);

// app.use("/api/auth", require("./routes/auth.routes"));
// app.use("/api/boards", require("./routes/board.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/property", require("./routes/property.routes"));
app.use("/api/admin", require("./routes/admin.routes"));

app.use(function (req, res, next) {
    res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

// error handling middleware
app.use(require("./middlewares/errors").resourcenNotFound);
app.use(require("./middlewares/errors").errorHandler);
// const {Errors} = require("../constants");
// const error = new Error(`__error message here__`);
// error.name = Errors.__errorName__;
// next(error);
// catch(error){next(error);}
// return;

connect()
    .then(() => {
        app.listen(process.env.PORT, () => {
            // var provider = new Provider("d637d6f1f507652091d9cdd7e83625adb8e69556ac8afac8df95aa76f081a6ea", "http://127.0.0.1:7545");
            // truffle_connect.web3 = new Web3(provider);
            // truffle_connect.web3 = new Web3(
            //     new Web3.providers.HttpProvider("http://127.0.0.1:7545")
            // );
            // console.log("listen --> ", truffle_connect);
            console.log(`server started!!`);
        });
    })
    .catch((error) => {
        process.exit(1);
    });
