const fs = require('fs');
const data = fs.readFileSync("users.json");
const users = JSON.parse(data);

// Post user 
const saveAUser = (req, res) => {
    const data = req.body;
    const { gender, name, contact, address, photoURL } = data;
    if (req.body.id) {
        return res.status(500).send({
            status: false,
            message: "Please enter these required properties only (gender, name, contact, address, photoURL)"
        })
    }
    else if (gender && name && contact && address && photoURL) {
        users.push({ id: users.length + 1, ...data });
        const newD = JSON.stringify(users);
        fs.writeFileSync("users.json", newD);
        res.status(200)
            .send({
                status: true,
                message: "User added successfully",
                data: users
            });
    }
    else {
        return res.status(500)
            .send({
                status: false,
                message: "Please enter these required properties only (gender, name, contact, address, photoURL)"
            });
    }
}

// Random user 
const getRandomUser = (req, res) => {
    const randomUser = Math.floor(Math.random() * users.length);
    res.status(200)
        .send({
            status: true,
            message: "Random User found",
            data: users[randomUser]
        });
}

module.exports = {
    getRandomUser,
    saveAUser
}