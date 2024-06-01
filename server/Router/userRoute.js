const express = require("express")
const User = require("../models/userModel.js")
const router = express.Router()
router.use(express.json());


router.post("/", async (req, res) => {
    const { name, email, age } = req.body;

    try {
        const user = await User.create({
            name: name,
            email: email,
            age: age
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {

    try {
        const showAll = await User.find();

        res.status(200).json(showAll);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

})

router.get('/', async (req, res) => {
    const {id} = req.params;
    try {
        const singleuser = await User.find({_id :id});

        res.status(200).json(singleuser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const singleuser = await User.findByIdAndDelete({_id :id});

        res.status(200).json(singleuser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})




router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    
    try {
        const update = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!update) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(update);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;