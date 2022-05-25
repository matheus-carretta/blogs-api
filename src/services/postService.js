const { Op } = require('sequelize');

const { BlogPost, User, Category } = require('../database/models');
const { errorHandler } = require('../utils');

const create = async (postInfos) => {
  const { categoryIds, ...post } = postInfos;
  
  const categories = await Category.findAndCountAll({ where: { id: categoryIds } });

  if (categories.count === 0) {
    throw errorHandler(400, '"categoryIds" not found');
  }

  const createdPost = await BlogPost.create(post);
  
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

const update = async (id, title, content, loggedId) => {
  if (loggedId !== +id) throw errorHandler(401, 'Unauthorized user');

  await BlogPost.update({ title, content }, { where: { id } });

  const updatedPost = await getById(id);

  return updatedPost;
};

const destroy = async (postId, loggedId) => {
  const { dataValues: { userId } } = await getById(postId);

  if (userId !== loggedId) throw errorHandler(401, 'Unauthorized user');

  const deletedPost = BlogPost.destroy({ where: { id: postId } });

  return deletedPost;
};

const getByQuery = async (term) => {
  const posts = await BlogPost.findAll(
    { where:
     { [Op.or]: [
      { title: { [Op.like]: `%${term}%` } },
      { content: { [Op.like]: `%${term}%` } },
      ],
     },
    include:
    [{ model: User, as: 'user', attributes: { exclude: 'password' } },
     { model: Category, as: 'categories', through: { attributes: [] } }],
    },
  );

  return posts;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  destroy,
  getByQuery,
};
