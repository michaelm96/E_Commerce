'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Cart extends Model {}

  Cart.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Product name should not be empty"
        },
        notNull: {
          msg: "Product name should not be empty"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          msg: "Product image not url type/ empty"
        },
        notNull: {
          msg: "Product image url should not be empty"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "Price should be filled or should be in integer form/ berbentuk bilangan bulat"
        },
        min: {
          args: [1],
          msg: "Minimum price is Rp.1"
        },
        notNull: {
          msg: "Price should not be empty"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "Stock should be filled or should be in integer form/ berbentuk bilangan bulat"
        },
        notNull: {
          msg: "Stock should not be empty"
        },
        min: {
          args: [0],
          msg: "Minimum stock is 0"
        },
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Product category should not be empty"
        },
        notNull: {
          msg: "Product category should not be empty"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "UserId should not be empty"
        },
        notEmpty: {
          msg: "UserId should not be empty"
        },
      }
    }
  }, { sequelize });
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.User)
  };
  return Cart;
};