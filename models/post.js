
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'posts'
    });
    return Post;
};
