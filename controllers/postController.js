const { Post, User, Tag, Comment, sequelize } = require('../models');
const ApiResponse = require('../utils/response');
const config = require('../config/config');

exports.createPost = async (req, res, next) => {
    const { title, content, tags } = req.body; // tags is an array of tag names
    const authorId = req.user.id;
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }
    const t = await sequelize.transaction();
    try {
        const post = await Post.create({ title, content, authorId }, { transaction: t });
        if (tags && tags.length > 0) {
            const tagInstances = await Promise.all(
                tags.map(name => Tag.findOrCreate({ where: { name }, transaction: t }))
            );
            await post.setTags(tagInstances.map(t => t[0]), { transaction: t });
        }
        await t.commit();
        res.status(201).json(post);
    } catch (error) {
        await t.rollback();
        next(error);
    }
};

exports.getAllPosts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || config.api.pagination.defaultLimit, config.api.pagination.maxLimit);
        const offset = (page - 1) * limit;

        const { count, rows: posts } = await Post.findAndCountAll({
            include: [
                { model: User, as: 'author', attributes: ['id', 'username'] },
                { model: Tag, as: 'tags', attributes: ['id', 'name'], through: { attributes: [] } }
            ],
            order: [['createdAt', 'DESC']],
            limit,
            offset
        });

        return ApiResponse.paginated(res, posts, { page, limit, total: count }, 'Posts retrieved successfully');
    } catch (error) {
        next(error);
    }
};

exports.getPostById = async (req, res, next) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [
                { model: User, as: 'author', attributes: ['id', 'username'] },
                { model: Tag, as: 'tags', attributes: ['id', 'name'], through: { attributes: [] } },
                { 
                    model: Comment, 
                    as: 'comments', 
                    include: [{ model: User, as: 'author', attributes: ['id', 'username']}]
                }
            ]
        });
        if (!post) return res.status(404).json({ message: 'Post not found.' });
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

exports.updatePost = async (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.id;
    try {
        const post = await Post.findByPk(id);
        if (!post) return res.status(404).json({ message: 'Post not found.' });
        if (post.authorId !== userId) return res.status(403).json({ message: 'Forbidden.' });

        post.title = title;
        post.content = content;
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

exports.deletePost = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const post = await Post.findByPk(id);
        if (!post) return res.status(404).json({ message: 'Post not found.' });
        if (post.authorId !== userId) return res.status(403).json({ message: 'Forbidden.' });

        await post.destroy();
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

exports.addCommentToPost = async (req, res, next) => {
    const { postId } = req.params;
    const { text } = req.body;
    const authorId = req.user.id;
    if (!text) return res.status(400).json({ message: 'Comment text is required.' });
    try {
        const post = await Post.findByPk(postId);
        if (!post) return res.status(404).json({ message: 'Post not found.' });
        
        const comment = await Comment.create({ text, authorId, postId });
        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
};
