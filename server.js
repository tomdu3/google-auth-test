const express = require("express");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 5000;

// Middleware
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render('index.ejs')
})


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))