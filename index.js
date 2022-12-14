const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.route')
const port = 5000;
const app = express();

app.use(cors());
app.use(express.json());


app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send("Random User API")
})

app.all('*', (req, res) => {
    res.send("No route found")
})

app.listen(port, () => {
    console.log("Listening to port", port);
})