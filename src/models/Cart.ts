import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Product from './Product';

class Cart extends Model {
    public id!: number;
    public product_id!: number;
    public quantity!: number;
    public readonly created_at!: Date;
}

Cart.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id',
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: new Date().toISOString(),
    },
}, {
    sequelize,
    modelName: 'Cart',
    tableName: 'Cart',
    timestamps: false,
});

// Define la relación
Cart.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

export default Cart;