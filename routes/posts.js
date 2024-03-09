const express = require('express');
const Post = require('../models/post');
const router = express.Router();

//get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        req.json({ message: error });
    }
})

//submit a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const result = await post.save();
        res.status(201).json(result);
    } catch (err) {
        res.json({ message: "error occurred" });
    }
});

//specific post
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: "The post with the given ID was not found." });
        res.json(post);
    } catch (e) {
        res.send('Error:' + e);
    }
});

//delete a specific post
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const removedPost = await Post.deleteOne({ _id: id });
        if (!removedPost) return res.status(404).json({ message: 'No post with this id was found.' })
        res.json(removedPost);
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
        console.log(e);
    }
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedPost = await Post.updateOne({ _id: id }, { $set: { title: req.body.title, description: req.body.description } });
        if (!updatedPost) {
            return res.status(404).json({ message: "Post Not Found!" });
        } else {
            res.json(updatedPost);
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
})

module.exports = router;