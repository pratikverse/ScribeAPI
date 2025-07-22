const { sequelize } = require('../models');

const syncDatabase = async () => {
    try {
        console.log('Starting database synchronization...');
        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    } finally {
        await sequelize.close();
    }
};

syncDatabase();