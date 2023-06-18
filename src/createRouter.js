const express = require('express');

const createRouter = (controllers) => {

    const router = express.Router();

    const methodBinders = {
        POST: (path, handler, validators = []) => {
            router.post(path, ...validators, handler);
        },
        PATCH: (path, handler, validators = []) => {
            router.patch(path, ...validators, handler);
        },
        PUT: (path, handler, validators = []) => {
            router.put(path, ...validators, handler);
        },
        GET: (path, handler, validators = []) => {
            router.get(path, ...validators, handler);
        },
        DELETE: (path, handler, validators = []) => {
            router.delete(path, ...validators, handler);
        },
    };

    const bindEndpoint = (endpoint) => {
        const {
            method, path, operation, validators,
        } = endpoint.toObject();
        const binder = methodBinders[method];
        binder(path, operation, validators);
    };

    for (const controller of controllers) {
        for (const endpoint of controller) {
            bindEndpoint(endpoint);
        }
    }

    return router;
};

module.exports = createRouter;
