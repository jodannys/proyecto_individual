const app = require('../../src/app.js');
const session = require('supertest-session');

const agent = session(app);

describe('GET /dogs/:id', () => {
    it('ruta detalles de un perro, debe devolver 200', () =>
        agent.get('/dogs/:id').expect(200)
   );
})