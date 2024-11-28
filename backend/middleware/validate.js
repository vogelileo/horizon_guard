export default (schema) => {
  return (req, res, next) => {
    const { body, query, files } = req;
    //Validation Logic
    if (schema.query) {
      let validation = schema.query.validate(query);
      if (validation.error) {
        try {
          return res
            .status(400)
            .json({ error: validation.error.details[0].message });
        } catch (e) {
          return res.status(400).json({ error: 'Invalide parameters' });
        }
      }
    }
    if (schema.body) {
      let validation = schema.body.validate(body);
      if (validation.error) {
        try {
          return res
            .status(400)
            .json({ error: validation.error.details[0].message });
        } catch (e) {
          return res.status(400).json({ error: 'Invalide parameters' });
        }
      }
    }
    if (schema.files) {
      let validation = schema.files.validate(files);
      if (validation.error) {
        try {
          return res
            .status(400)
            .json({ error: validation.error.details[0].message });
        } catch (e) {
          return res.status(400).json({ error: 'Invalide parameters' });
        }
      }
    }

    next();
  };
};
