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

// All USer 
const getAllUsers = (req, res) => {
    const { limit } = req.query;
    res.status(200)
        .send({
            status: true,
            message: "Users found successfully",
            data: users.slice(0, limit)
        });
}

// Delete USer 
const deleteUser = (req, res) => {
    const { id } = req.params;
    const IDFound = users.find(user => +user.id === +id);
    if (!IDFound) {
        return res.status(500).send("Provided ID not found")
    }
    else {
        const newData = users.filter(user => +user.id !== +id);
        fs.writeFileSync("users.json", JSON.stringify(newData))
        res.status(200).send({
            status: true,
            message: "User deleted successfully",
            data: newData
        });
    }

}

// Update User 
const updateUser = (req, res) => {
    const { id } = req.params;
    const updateUser = users.find(user => +user.id === +id);
    if (!updateUser) {
        return res.status(500).send("Provided ID not found")
    }
    const updatedData = req.body;
    if (Object.keys(updatedData).length === 0) {
        return res.status(500).send("Provide a json file to update data")
    }
    else {
        const index = users.indexOf(updateUser);
        users[index] = { ...updateUser, ...updatedData };
        fs.writeFileSync("users.json", JSON.stringify(users))
        res.status(200).send({
            status: true,
            message: "User updated successfully",
            data: users
        });
    }
}

// Bulk Update 
const bulkUpdate = (req, res) => {
    const { id, updatedData } = req.body;
    
    if(!Array.isArray(id)){
        return res.status(500).send({
            status: false,
            message: `Write a json where id will be a array and updatedData will be a object.Body will be look like this { "id": [1, 2],"updatedData": {"gender": "male", "name": "Noyon"}} `
        })
    }
    for (let i = 0; i < id.length; i++) {
        let updatedID = id[i];
        const findUser = users.find(user => user.id == updatedID)

        if (!findUser) return res.status(500).send("User ID not found");

        else {
            const index = users.indexOf(findUser);
            users[index] = { ...findUser, ...updatedData };
        }
    }
    fs.writeFileSync("users.json", JSON.stringify(users))
    res.status(200).send({
        status: true,
        message: "User updated successfully",
        data: users
    });
}

module.exports = {
    getRandomUser,
    saveAUser,
    getAllUsers,
    deleteUser,
    updateUser,
    bulkUpdate
}