const { Dog } = require('../../src/db.js');

it('el nombre no puede ser null', (done) => {
  Dog.create({})
    .then(() => done(new Error('Requiere un nombre valido')))
    .catch(() => done());
});

