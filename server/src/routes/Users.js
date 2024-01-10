const { Router } = require('express');
const userRouter = Router();
const {User} = require('../db.js')
const { Op } = require('sequelize');


// Ruta para crear un nuevo usuario
userRouter.post('/users', async (req, res) => {
    try {
      const { username, email, password, image } = req.body;
  
      // Verifica si el username o el email ya existen en la base de datos
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });
  
      if (existingUser) {
        return res.status(400).json({ message: 'El nombre de usuario o correo electrónico ya están en uso' });
      }
  
      // Crea un nuevo usuario
      const newUser = await User.create({ username, email, password, image });
  
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear el usuario' });
    }
});


// Ruta para obtener todos los usuarios
userRouter.get('/users', async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
});

// Ruta para buscar un usuario por ID
userRouter.get('/users/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findByPk(userId);
  
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al buscar el usuario' });
    }
});

// Ruta para eliminar un usuario por ID
userRouter.delete('/users/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const deletedUser = await User.destroy({ where: { user_id: userId } });
      
      if (deletedUser) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
});


module.exports = userRouter;