const mongoose = require('mongoose');

const URI = 'mongodb://localhost/usuarios';
mongoose.connect(URI)
    .then(() => console.log('La DB se encuentra conectada'))
    .catch(err => console.error(err));

module.exports = mongoose;
