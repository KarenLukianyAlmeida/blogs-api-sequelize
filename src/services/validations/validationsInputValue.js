const {
  displayNameSchema,
  passwordSchema,
} = require('./schemas');

const validateDisplayName = (displayName) => {
  const { error } = displayNameSchema.validate(displayName);
  if (error) {
    return { status: 400, message: error.message };
  }
};

const validatePassword = (password) => {
  const { error } = passwordSchema.validate(password);
  if (error) {
    return { status: 400, message: error.message };
  }
};

module.exports = {
  validateDisplayName,
  validatePassword,
};