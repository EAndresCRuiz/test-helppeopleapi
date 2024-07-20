import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Category from './Category';

class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id',
    },
  },
  created_at: {
    type: 'TIMESTAMP',
    defaultValue: new Date().toISOString(),
  },
  updated_at: {
    type: 'TIMESTAMP',
    defaultValue: new Date().toISOString(),
  },
}, {
  sequelize,
  modelName: 'Product',
  timestamps: false,
});

// Define la relación
Product.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Product, { foreignKey: 'category_id' });

export default Product;