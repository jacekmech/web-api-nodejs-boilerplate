const { report500 } = require('./errorReporters');

const wrapOperationWith500Reporter = (operation) => {
    return async (req, res) => {
        try {
            await operation(req, res);
        } catch (error) {
            report500(res);
            throw error;
        }
    };
};

const wrapWith500Reporter = (controllers) => {

    const wrappedControllers = [];

    for (const controller of controllers) {

        const wrappedController = [];
        wrappedControllers.push(wrappedController);

        for (const endpoint of controller) {
            const wrappedEndpoint = endpoint.wrapOperation(wrapOperationWith500Reporter);
            wrappedController.push(wrappedEndpoint);
        }
    }

    return wrappedControllers;
};

module.exports = { wrapWith500Reporter };
