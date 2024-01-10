const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Post', {
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    likes:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
  })
};