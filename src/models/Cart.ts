import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Product from './Product';

class Cart extends Model {}

Cart.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: 'TIMESTAMP',
    defaultValue: new Date().toISOString(),
  },
}, {
  sequelize,
  modelName: 'Cart',
  timestamps: false,
});

// Define la relación
Cart.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasMany(Cart, { foreignKey: 'product_id' });

export default Cart;