const express = require('express');
const router = express.Router();
const UserSchema = require('../modules/User');

router.post('/', (req, res) => {
    const user = new UserSchema(req.body);

    user.save()
        .then(result => res.send(result))
        .catch(error => res.status(400).send(error))
});

router.post('/sessions', async (req, res) => {
    const user = await UserSchema.findOne({username: req.body.username});

    if (!user) {
        return res.status(400).send({error: "Username/password incorrect!" })
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch){
        return res.status(400).send({error: "Username/password incorrect!" })
    }

    res.send({message: "Username and password correct!"})
});

module.exports = router;