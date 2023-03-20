const express = require('express');
const router = express.Router();
const {Posts} = require('../models');
const ValidateToken = require('../Middleware/AuthMiddleware');

router.get("/", async (req, res) => {
    Posts.findAll().then((data) => {
        res.json(data);
    }).catch(err => res.status(500).send({message: err.message || "Failed to retrive Posts"}))
});

router.get("/:id", async (req,res) => {
    const id = req.params.id;
    Posts.findByPk(id).then(
        (data) => {
            if(data){
                res.json(data)
            } else {
                res.status(404).json({message: `Post could not be fond for id ${id}`})
            }
        }
    ).catch(err => res.status(500).send({message: err.message || `Failed to retrieve post for id ${id}`}));
});

router.post("/", ValidateToken, async (req, res) => {
    const post = req.body;
    post.username = req.user
    console.log(post)
    await Posts.create(post).then((data) => {
        res.json({"id" : data.id});
    }).catch(err => res.status(500).send({message: err.message || "Failed to create a post"}));
});

router.put("/:id", ValidateToken, async(req, res)=> {
    const id = req.params.id;
    await Posts.update(req.body, {
        where: {id : id}
    }).then((data) => {
        if(data == 1){
            res.json(data)
        } else {
            res.status(404).send({message: `Failed to update post for id ${id}`})
        }
    }).catch(err => res.status(500).send({message: err.message || "Failed to update post"}))
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await Posts.destroy({where: {id:id}}).then(
        data => {
            if(data == 1){
                res.status(200).send();
            } else {
                res.status(404).json({message: `Failed to delete post for id ${id}`})
            }
        }
    ).catch(err => res.status(500).send({message: "Failed to delete"}))
})

module.exports  = router;