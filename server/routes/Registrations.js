const express = require('express')
const router = express.Router()
const {Registrations} = require('../models')
const ValidateToken = require('../Middleware/AuthMiddleware')
const bcrypt = require('bcrypt')
const {sign} = require('jsonwebtoken')

router.post('/', async(req, res) => {
    const {username, fullName, emailId, password} = req.body;
    const usernameExists = await Registrations.findOne({where: {username: username}})
    if(usernameExists == null){
        bcrypt.hash(password, 10).then((hash) => {
            Registrations.create({
                username:username,
                fullName:fullName,
                emailId:emailId,
                password:hash
            }).then(data => res.json({id: data.id}))
        }).catch(err => res.status(500).json({error: err.message}))
    } else {
        res.status(500).json({error: `${username} isalready taken`})
    }   
})

router.post('/login', async(req, res) => {
    const {username, password} = req.body
    await Registrations.findOne({where: {username: username}}).then(data => {
        if(data != null){
            bcrypt.compare(password, data.dataValues.password).then((data1) => {
                if(data1) {
                    const accessToken = sign({username: data.username, id: data.id}, "Important")
                    res.json({message: accessToken})
                }
                else {
                    res.status(401).json({error: 'Authentication failed'})
                }
            })
        } else {
            res.status(404).json({error: 'Username invlid'})
        }
    }).catch(err => res.status(500).json({error: err.message}))
})

router.delete('/:username', async(req, res) => {
    const {username} = req.params;
    const usernameExists = await Registrations.findOne({where: {username: username}})
    if(usernameExists == null){
        res.status(404).json({error: `username could not be found`})
    } else {
        console.log(usernameExists.dataValues.id)
        await Registrations.destroy({where: {username: username}}).then(() => res.json({message: 'deletion successful'}))
    }
})

router.get('/', ValidateToken, async(req, res) => {
    res.send();
})

module.exports = router