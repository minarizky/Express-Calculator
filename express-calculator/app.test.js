const request = require('supertest');
const app = require('./app');

describe('GET /mean', () => {
  test('should return the mean of numbers', async () => {
    const res = await request(app).get('/mean?nums=1,2,3,4,5');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ operation: 'mean', value: 3 });
  });

  test('should return 400 for invalid input', async () => {
    const res = await request(app).get('/mean?nums=foo,2,3');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('foo is not a number.');
  });
});

describe('GET /median', () => {
  test('should return the median of numbers', async () => {
    const res = await request(app).get('/median?nums=1,2,3,4,5');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ operation: 'median', value: 3 });
  });

  test('should return the median for an even number of elements', async () => {
    const res = await request(app).get('/median?nums=1,2,3,4');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ operation: 'median', value: 2.5 });
  });
});

describe('GET /mode', () => {
  test('should return the mode of numbers', async () => {
    const res = await request(app).get('/mode?nums=1,2,2,3,4');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ operation: 'mode', value: 2 });
  });
});

describe('Error handling', () => {
  test('should return 400 for missing nums parameter', async () => {
    const res = await request(app).get('/mean');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('nums are required.');
  });
});
