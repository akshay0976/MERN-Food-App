const express = require('express');
const cors = require('cors'); // ✅ Add this

const app = express();
const mongoDB = require('./db');
mongoDB();

// ✅ Use the cors middleware
app.use(cors({
    origin: "http://localhost:3000", // Allow your React frontend
    credentials: true,
}));

app.use(express.json());

app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
});

app.listen(3004, () => {
    console.log(`Server is running at http://localhost:3004`);
});
