import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('Testhelppeople', 'SA', 'Password_123#', {
    host: 'db',
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: true, // Necesario para Azure SQL
        trustServerCertificate: true, // Necesario para desarrollo local
      },
    },
    logging: false, // Deshabilita el logging de Sequelize
});

export default sequelize;