const express = require("express");
const pg = require("pg");
const bcrypt = require("bcrypt");
const cors = require("cors");

const Client = pg.Client;
const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "spotify",
    password: "spotify",
    port: 5432
});

client.connect();

const app = express();
app.use(express.json());
app.use(cors()); // allow all origins

app.post("/register", async (req, res) => {
    const { uname, email, pwd } = req.body;
    if (!uname || !email || !pwd) {
        return res.status(400).send("All fields are required");
    }
    try {
        const hashedpwd = await bcrypt.hash(pwd, 10);
        const query = "INSERT INTO users(username, password, email) VALUES($1, $2, $3)";
        const values = [uname, hashedpwd, email];
        await client.query(query, values);
        res.status(201).send("User registered successfully");
    } catch (err) {
        console.error("Registration error:", err.stack);
        res.status(500).send("Error in registration");
    }
});

app.post("/login", async (req, res) => {
    const { uname, pwd } = req.body;
    if (!uname || !pwd) {
        return res.status(400).send("Username and password are required");
    }
    try {
        const query = "SELECT password FROM users WHERE username=$1";
        const values = [uname];
        const result = await client.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).send("User not found");
        }
        const storedHash = result.rows[0].password;
        const match = await bcrypt.compare(pwd, storedHash);
        if (match) {
            res.send("Login successful");
        } else {
            res.status(401).send("Invalid password");
        }
    } catch (err) {
        console.error("Login error:", err.stack);
        res.status(500).send("Login error");
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
