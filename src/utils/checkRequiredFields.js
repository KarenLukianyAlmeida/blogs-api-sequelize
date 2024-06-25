module.exports = (body) => {
  const keys = Object.keys(body);
  const allFieldsFilled = keys.every((key) => body[key].length > 0);
  return allFieldsFilled;
};
