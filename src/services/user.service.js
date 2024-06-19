const { User } = require('../models');

const getUserByPassword = async (email) => {
  const user = await User.findOne({
    where: { email },
  });

  return user;
};

module.exports = {
  getUserByPassword,
};