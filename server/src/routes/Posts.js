const { Router } = require('express');
const postRouter = Router();
const {Post} = require('../db.js')

// Ruta para crear un nuevo post
postRouter.post('/posts', async (req, res) => {
    try {
      const { content, user_id, image} = req.body;
      const newPost = await Post.create({ content, user_id, image });
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear el post' });
    }
});

// Ruta para eliminar un post por ID
postRouter.delete('/posts/:postId', async (req, res) => {
    try {
      const postId = req.params.postId;
      const deletedPost = await Post.destroy({ where: { post_id: postId } });
      
      if (deletedPost) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Post no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar el post' });
    }
});

// Ruta para obtener todos los posts
postRouter.get('/posts', async (req, res) => {
    try {
      const posts = await Post.findAll();
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los posts' });
    }
});

// Ruta para obtener todos los posts de un usuario
postRouter.get('/user/:userId/posts', async (req, res) => {
    try {
      const userId = req.params.userId;
      const userPosts = await Post.findAll({ where: { user_id: userId } });
  
      if (userPosts.length > 0) {
        res.status(200).json(userPosts);
      } else {
        res.status(404).json({ message: 'No se encontraron posts para el usuario especificado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los posts del usuario' });
    }
});



module.exports = postRouter;