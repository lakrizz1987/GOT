import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
class User {
    username: string = '';
    password: string = '';

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

const app = express();
app.use(express.json());

const port = 5000;
const saltRounds = 10;

const getSecret = () => ["WINTER", "IS", "COMING"].join("_");
const JWT_SECRET = getSecret();

const users: User[] = [];

await (async function setDefaultUser() {
    const hashedPass = await bcrypt.hash('1234', saltRounds);
    users.push(new User('ivan', hashedPass));
    console.log("Test user 'ivan' is loaded");
})();

//Register
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const isUserExist = users.find(user => user.username === username);
    if (isUserExist) {
        return res.status(400).send("User already exist");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    users.push(new User(username, hashedPassword));
    res.send("User register successful");
});

//Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)

        if (isMatch) {
            const token = jwt.sign({ username }, JWT_SECRET);
            return res.send({ token });
        }
    }

    res.status(400).send("Invalid credentials");
});

app.listen(port, () => {
    console.log(`Server is running on port - ${port}`);
});

