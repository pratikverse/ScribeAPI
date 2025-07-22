
const { Sequelize } = require('sequelize');
const path = require('path');

// Build a reliable path to the config file
const configPath = path.join(__dirname, '..', 'config', 'config.js');
const config = require(configPath);

// Use the direct database configuration object from the simplified config
const dbConfig = config.db;

// Initialize Sequelize with the correct configuration
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.Tag = require('./tag')(sequelize, Sequelize);

// User -> Post (One-to-Many)
db.User.hasMany(db.Post, { as: 'posts', foreignKey: 'authorId' });
db.Post.belongsTo(db.User, { as: 'author', foreignKey: 'authorId' });

// User -> Comment (One-to-Many)
db.User.hasMany(db.Comment, { as: 'comments', foreignKey: 'authorId' });
db.Comment.belongsTo(db.User, { as: 'author', foreignKey: 'authorId' });

// Post -> Comment (One-to-Many)
db.Post.hasMany(db.Comment, { as: 'comments', foreignKey: 'postId' });
db.Comment.belongsTo(db.Post, { as: 'post', foreignKey: 'postId' });

// Post <-> Tag (Many-to-Many)
db.Post.belongsToMany(db.Tag, { through: 'PostTags', as: 'tags', foreignKey: 'postId' });
db.Tag.belongsToMany(db.Post, { through: 'PostTags', as: 'posts', foreignKey: 'tagId' });

module.exports = db;
