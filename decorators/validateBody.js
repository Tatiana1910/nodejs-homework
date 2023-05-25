const { HttpError } = require("../utils/HttpError");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new HttpError(400, `Missing fields: ${error.message}`);
    }

    next();
  };
};

module.exports = validateBody;
