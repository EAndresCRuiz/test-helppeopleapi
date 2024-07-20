import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Category extends Model {}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
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
  modelName: 'Category',
  timestamps: false,
});

export default Category;