const { Tag, Post, User } = require('../models');

exports.getAllTags = async (req, res, next) => {
    try {
        const tags = await Tag.findAll({ order: [['name', 'ASC']] });
        res.status(200).json(tags);
    } catch (error) {
        next(error);
    }
};

exports.getPostsByTagName = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            include: [
                { model: User, as: 'author', attributes: ['id', 'username'] },
                {
                    model: Tag,
                    as: 'tags',
                    where: { name: req.params.name },
                    attributes: []
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};
