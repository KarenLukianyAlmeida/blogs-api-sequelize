const checkRequiredFields = require('../utils/checkRequiredFields');

module.exports = (req, res, next) => {  
  const { body } = req;
  
  const allFieldsFilled = checkRequiredFields(body);
  if (!allFieldsFilled) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  return next();
};