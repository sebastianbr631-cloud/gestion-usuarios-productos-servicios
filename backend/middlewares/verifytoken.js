const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const header = req.headers['authorization'];

  if (!header) {
    return res.status(401).json({ msg: 'No hay token' });
  }

  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, 'secreto');

    req.user = decoded;
    next();

  } catch (error) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
};

module.exports = verifyToken;