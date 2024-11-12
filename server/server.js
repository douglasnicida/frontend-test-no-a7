const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views")); 
app.use(express.static('../public'));
app.use(express.json());

let items = []

app.get('/', (req, res) => {
    var locals = {
        title: "Items List",
        items: items
    }

    res.render("index", locals)
})

app.post('/items/add', (req, res) => {

    try {
        const number = parseInt(req.body.number);
    
        items = items.filter((item) => item <= number);
        for(let i=items.length+1 ; i<=number ; i++) items.push(i)
    
        res.status(200).json({ message: "Items added with success!", items })
    } catch (error) {
        res.status(500).json({ message: "An error occurred!", items: [] })
    }
    
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})