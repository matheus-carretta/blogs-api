const { BlogPost, User, Category } = require('../database/models');
const { errorHandler } = require('../utils');

const create = async (postInfos) => {
  const { email, categoryIds, ...post } = postInfos;
  
  const categories = await Category.findAndCountAll({ where: { id: categoryIds } });

  if (categories.count === 0) {
    throw errorHandler(400, '"categoryIds" not found');
  }

  const user = await User.findOne({ where: { email } });

  const completPost = {
    ...post,
    userId: user.id,
  };

  const createdPost = await BlogPost.create(completPost);
  
  await createdPost.addCategories(categoryIds);

  return createdPost;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({ include:
     [{ model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } }],
    });

  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, { include:
    [{ model: User, as: 'user', attributes: { exclude: 'password' } },
     { model: Category, as: 'categories', through: { attributes: [] } }],
   });

  if (!post) throw errorHandler(404, 'Post does not exist');

  return post;
};

const update = async (id, title, content, email) => {
  const user = await User.findOne({ where: { email } });

  if (user.dataValues.id !== +id) throw errorHandler(401, 'Unauthorized user');

  await BlogPost.update({ title, content }, { where: { id } });

  const updatedPost = await getById(id);

  return updatedPost;
};

const destroy = async (id, email) => {
  const { dataValues: { userId } } = await getById(id);

  const { dataValues: { id: loggedId } } = await User.findOne({ where: { email } });

  if (userId !== loggedId) throw errorHandler(401, 'Unauthorized user');

  const deletedPost = BlogPost.destroy({ where: { id } });

  return deletedPost;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  destroy,
};
