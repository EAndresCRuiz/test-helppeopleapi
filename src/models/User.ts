import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
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
  modelName: 'User',
  timestamps: false,
});

export default User;