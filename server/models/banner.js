'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Banner extends Model {}
  Banner.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Banner name should not be empty"
        },
        notNull: {
          msg: "Banner name should not be empty"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          msg: "Banner image not url type/ empty"
        },
        notNull: {
          msg: "Banner image url should not be empty"
        }
      }
    }
  }, { sequelize });

  Banner.associate = function(models) {
    // associations can be defined here
  };
  return Banner;
};