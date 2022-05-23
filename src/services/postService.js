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
  
  const x = await createdPost.addCategories(categoryIds);

  console.log(x);
  return createdPost;
};

module.exports = {
  create,
};
