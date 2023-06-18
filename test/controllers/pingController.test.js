const request = require('supertest');

const {
    beforeAction,
    afterAction,
} = require('../setup');

let httpServer;

beforeAll(async () => {
    server = await beforeAction();
    httpServer = server.httpServer;
});

afterAll(async () => {
    await afterAction();
});

test('Ping application', async () => {
    const res = await request(httpServer)
        .get('/api/public/ping')
        .query({ callerName: 'tester' })
        .expect(200);
    expect(res.text.startsWith('Pong at')).toBeTruthy();
});
