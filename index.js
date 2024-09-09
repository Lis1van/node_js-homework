// const express = require("express");
//
// const app = express();
//
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
//
// const users = [
//     {id: 1, name: 'Maksym', email: 'feden@gmail.com', password: 'qwe123'},
//     {id: 2, name: 'Alina', email: 'alindosik@gmail.com', password: 'ert345'},
//     {id: 3, name: 'Anna', email: 'ann43@gmail.com', password: 'ghj393'},
//     {id: 4, name: 'Tamara', email: 'tomochka23@gmail.com', password: 'afs787'},
//     {id: 5, name: 'Dima', email: 'taper@gmail.com', password: 'rtt443'},
//     {id: 6, name: 'Rita', email: 'torpeda@gmail.com', password: 'vcx344'},
//     {id: 7, name: 'Denis', email: 'denchik@gmail.com', password: 'sdf555'},
//     {id: 8, name: 'Sergey', email: 'BigBoss@gmail.com', password: 'ccc322'},
//     {id: 9, name: 'Angela', email: 'lala@gmail.com', password: 'cdd343'},
//     {id: 10, name: 'Irina', email: 'irka7@gmail.com', password: 'kkk222'},
// ];
//
// app.get('/users', (req, res) => {
//     try {
//         res.send(users);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });
//
// app.post('/users', (req, res) => {
//     try {
//         const {name, email, password} = req.body;
//         //TODO validate data
//         const id = users[users.length - 1].id + 1;
//         const newUser = {id, name, email, password};
//         users.push(newUser);
//         res.status(201).send(newUser);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });
//
// app.get('/users/:userId', (req, res) => {
//     try {
//         const userId = Number(req.params.userId);
//         const user = users.find(user => user.id === userId);
//         if (!user) {
//             return res.status(404).send('User not found');
//         }
//         res.send(user);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });
//
// app.put('/users/:userId', (req, res) => {
//     try {
//         const userId = Number(req.params.userId);
//         const userIndex = users.findIndex(user => user.id === userId);
//         if (userIndex === -1) {
//             return res.status(404).send('User not found');
//         }
//         const {name, email, password} = req.body;
//         //TODO validate data
//         // users[userIndex] = {...users[userIndex], name, email, password};
//         users[userIndex].name = name;
//         users[userIndex].email = email;
//         users[userIndex].password = password;
//         res.status(201).send(users[userIndex]);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });
//
// app.delete('/users/:userId', (req, res) => {
//     try {
//         const userId = Number(req.params.userId);
//         const userIndex = users.findIndex(user => user.id === userId);
//         if (userIndex === -1) {
//             return res.status(404).send('User not found');
//         }
//         users.splice(userIndex, 1);
//         res.sendStatus(204);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });
//
// app.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });
//


const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersFilePath = path.join(__dirname, "users.json");

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateName(name) {
    return name.length >= 3;
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
}

function readUsers() {
    try {
        const data = fs.readFileSync(usersFilePath, "utf8");
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function writeUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

app.get("/users", (req, res) => {
    try {
        const users = readUsers();
        res.send(users);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.post("/users", (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!validateName(name)) {
            return res.status(400).send("Имя должно содержать не менее 3 символов.");
        }

        if (!validateEmail(email)) {
            return res.status(400).send("Неправильный формат email.");
        }

        if (!validatePassword(password)) {
            return res
                .status(400)
                .send(
                    "Пароль должен быть не менее 6 символов и содержать хотя бы одну цифру и одну букву."
                );
        }

        const users = readUsers();
        const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        const newUser = { id, name, email, password };

        users.push(newUser);
        writeUsers(users);

        res.status(201).send(newUser);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.put("/users/:userId", (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const { name, email, password } = req.body;

        if (!validateName(name)) {
            return res.status(400).send("Имя должно содержать не менее 3 символов.");
        }

        if (!validateEmail(email)) {
            return res.status(400).send("Неправильный формат email.");
        }

        if (!validatePassword(password)) {
            return res
                .status(400)
                .send(
                    "Пароль должен быть не менее 6 символов и содержать хотя бы одну цифру и одну букву."
                );
        }

        const users = readUsers();
        const userIndex = users.findIndex((user) => user.id === userId);

        if (userIndex === -1) {
            return res.status(404).send("Пользователь не найден.");
        }

        users[userIndex].name = name;
        users[userIndex].email = email;
        users[userIndex].password = password;

        writeUsers(users);
        res.status(201).send(users[userIndex]);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.delete("/users/:userId", (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const users = readUsers();

        const userIndex = users.findIndex((user) => user.id === userId);

        if (userIndex === -1) {
            return res.status(404).send("Пользователь не найден.");
        }

        users.splice(userIndex, 1);
        writeUsers(users);

        res.sendStatus(204);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
