const request = require('supertest');
const app = require('../src/app').default; // Asegúrate de que la ruta a tu aplicación Express sea correcta
const sequelize = require('../src/config/database').default; // Asegúrate de que la ruta a tu configuración de base de datos sea correcta

const PORT = process.env.TEST_PORT || 4000;

describe('Product API', () => {
  let server;
  let agent;
  let productId;

  beforeAll(async () => {
    server = app.listen(PORT, () => {
      console.log(`Test server running on port ${PORT}`);
    });
    agent = request.agent(server); // Usa el agente para hacer las solicitudes al servidor de prueba
  });

  afterAll(async () => {
    await sequelize.close();
    server.close();
  });

  it('should create a new product', async () => {
    const response = await agent
      .post('/api/products')
      .send({
        name: 'Test Product',
        description: 'This is a test product',
        price: 10.99,
        category_id: 1
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    productId = response.body.id;
  });

  it('should get all products', async () => {
    const response = await agent.get('/api/products');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get a product by ID', async () => {
    const response = await agent.get(`/api/products/${productId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', productId);
  });

  it('should update a product', async () => {
    const response = await agent
      .put(`/api/products/${productId}`)
      .send({
        name: 'Updated Product',
        description: 'This is an updated test product',
        price: 15.99,
        category_id: 1
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Updated Product');
  });

  it('should delete a product', async () => {
    const response = await agent.delete(`/api/products/${productId}`);
    expect(response.statusCode).toBe(204);
  });

  it('should return 404 for a non-existing product', async () => {
    const response = await agent.get(`/api/products/${productId}`);
    expect(response.statusCode).toBe(404);
  });
});
