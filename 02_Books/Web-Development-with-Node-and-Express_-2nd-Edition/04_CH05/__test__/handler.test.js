const handler = require('../lib/handler');

test('test home page', () => {
    const req = {};
    const res = { render: jest.fn() };
    handler.home(req, res);
    expect(res.render.mock.calls[0][0]).toBe('home');
});

test('test about page', () => {
    const req = {};
    const res = { render: jest.fn() };
    handler.about(req, res);
    console.log('res2: ', res.render.mock.calls[0][1]);
    expect(res.render.mock.calls[0][0]).toBe('about');
    expect(res.render.mock.calls[0][1]).toEqual(expect.objectContaining({ fortune: expect.stringMatching(/\W/) }));
});

test('test not found', () => {
    const req = {};
    const res = { render: jest.fn(), status: jest.fn() };
    handler.notFound(req, res);
    expect(res.render.mock.lastCall[0]).toBe('404');
    expect(res.render.mock.calls[0][0]).toBe('404');
});

test('test server error', () => {
    const err = {};
    const req = {};
    const res = { render: jest.fn(), status: jest.fn() };
    const next = {};
    handler.serverError(err, req, res, next);
    expect(res.render.mock.lastCall[0]).toBe('500');
    expect(res.render.mock.calls[0][0]).toBe('500');
});