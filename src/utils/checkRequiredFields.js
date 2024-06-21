module.exports = (body) => {
  const keys = Object.keys(body);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[1];
    if (!body[key]) {
      return { status: 400, data: { message: 'Some required fields are missing' } };
    }
  }

  return undefined;
};