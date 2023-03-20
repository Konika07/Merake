const express = require('express');
const ValidateToken = require('../Middleware/AuthMiddleware');
const router = express.Router();
const {Comments} = require('../models');
const {Posts} = require('../models');

router.post("/",ValidateToken, async(req, res) => {
    const body = req.body
    body.userName = req.user
    await Comments.create(body).then((data)=>{
        res.json(data)
    }).catch((err) => res.status(500).send({message: err.message || "Failed to create a post"}))
})

router.get("/:postId", async (req,res) => {
    const postId = req.params.postId
    const post = await Posts.findByPk(postId);
    if(post != null){
        await Comments.findAll({where: {
            postId:postId
        }}).then(data => res.json(data)).catch(err => res.status(500).send({message: err.message || `Failed to fetch comments for postid ${postId}`}))
    } else {

        res.status(404).send({message: `postId ${postId} not present`})
    }
})

module.exports = router;