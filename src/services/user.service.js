const { User } = require('../models');

const getUserByPassword = async (password) => {
  const user = await User.findOne({
    where: { password },
  });

  return user;
};

module.exports = {
  getUserByPassword,
};