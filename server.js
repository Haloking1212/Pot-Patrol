const express = require("express");// creates the server
const path = require("path");// allows us to know our html and css file location
const bodyParser = require("body-parser");// allows us to send and recieve data
const knex = require("knex");// allows us to access our database

const db = knex({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        user: "postgres",
        password: "Brittring19",
        database: "loginform",
    }
})

const app = express();

let initalPath = path.join(__dirname)

app.use(bodyParser.json());
app.use(express.static(initalPath));

app.get("/", (req, res) => {
    res.sendFile(path.join(initalPath, "index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(initalPath, "login.html"));
}); // creates login url path

app.get("/signup", (req, res) => {
    res.sendFile(path.join(initalPath, "signup.html"));
}); // creates signup url path


// post to the database
app.post("/signup-user", (req, res) => {
    const { name, email, password } = req.body;

    if (!name.length || !email.length || !password.length) {
        res.json("fill all the fields");
    } else {
        db("users").insert({
            name: name,
            email: email,
            password: password
        })
        .returning(["name", "email"])
        .then(data => {
            res.json([0])
        })
        .catch(err => {
            if(err.detail.includes("already exists")) {
                res.json("email already exists")
            }
        })
    }
})

app.listen(3000, (req, res) => {
    console.log("listening on port 3000...")
});