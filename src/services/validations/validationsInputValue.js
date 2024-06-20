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

const validateBody = (body) => {
  const { email, password } = body;

  if (!email || !password) {
    return { status: 400, message: 'Some required fields are missing' };
  }
};

const validateUserOrPassword = (user, password) => {
  if (!user || user.password !== password) {
    return { status: 400, message: 'Invalid fields' };
  }
};

const validateEmail = (email) => {
  const pattern = /^[^@]+@[^@]+$/;
  return pattern.test(email);
};

module.exports = {
  validateDisplayName,
  validatePassword,
  validateBody,
  validateUserOrPassword,
  validateEmail,
};