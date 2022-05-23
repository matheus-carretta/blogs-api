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

module.exports = {
  create,
  getAll,
  getById,
};
