const postService = require('../services/postService');
const { verifyToken } = require('../utils');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const token = verifyToken(req.token);

  const newPost = {
    title,
    content,
    categoryIds,
    email: token.data,
  };

  const created = await postService.create(newPost);

  return res.status(201).json(created);
};

const getAll = async (req, res) => {
  const posts = await postService.getAll();

  return res.status(200).json(posts);
};

module.exports = {
  create,
  getAll,
};
