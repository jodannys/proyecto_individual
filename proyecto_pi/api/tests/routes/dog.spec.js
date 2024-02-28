const app = require('../../src/app.js');
const session = require('supertest-session');
const { expect } = require('chai');

const agent = session(app);

describe('GET /dogs1', () => {
    it('debería devolver 200 al obtener las primeras 8 razas de perro', async () => {
        const response = await agent.get('/dogs1');
        expect(response.status).to.equal(200);
    });
});

describe('GET /dogs', () => {
    it('debería devolver 200 al obtener todas las razas de perro de la API', async () => {
        const response = await agent.get('/dogs');
        expect(response.status).to.equal(200);
    });
});

describe('GET /search', () => {
    it('debería devolver 200 al obtener todas las razas de perro de la API', async () => {
        const response = await agent.get('/search');
        expect(response.status).to.equal(200);
    });
});

describe('GET /temperamentos', () => {
    it('debería devolver 200 al obtener los temperamentos', async () => {
        const response = await agent.get('/temperamentos');
        expect(response.status).to.equal(200);
    });
});

describe('GET /dogs/:id', () => {
    it('debería devolver 200 al obtener los detalles de un perro', async () => {
        const response = await agent.get('/dogs/1');
        expect(response.status).to.equal(200);
    });
});

describe('GET /perros', () => {
    it('debería devolver 200 al obtener perros de la base de datos', async () => {
        const response = await agent.get('/perros');
        expect(response.status).to.equal(200);
    });
});

describe('GET /perros/:id/temperamentos', () => {
    it('debería devolver 200 al obtener los temperamentos de un perro específico por su ID', async () => {
        const response = await agent.get('/perros/1/temperamentos');
        expect(response.status).to.equal(200);
    });
});


describe('POST /createdog', () => {
    it('debería devolver 200 al crear un perro', async () => {
        const response = await agent.post('/createdog').send({
            name: 'Nombre del perro',
            altura: 50,
            peso: 20,
            años_vida: 10,
            imagenURL: 'https://example.com/perro.jpg',
        });
        expect(response.statusCode).to.equal(200); // Utiliza 'to.equal' en lugar de 'toBe'
    });
});

describe('POST /createtemperament', () => {
    it('debería devolver 200 al crear un temperamento', async () => {
        const response = await agent.post('/createtemperament').send({
            temperamentonuevo: 'Temperamento Nuevo',
        });
        expect(response.statusCode).to.equal(200); // Utiliza 'to.equal' en lugar de 'toBe'
    });
});
