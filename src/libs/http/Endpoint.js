class Endpoint {

    constructor(method, path, operation, validators) {
        this.method = method;
        this.path = path;
        this.operation = operation;
        this.validators = validators;
    }

    getMethod() {
        return this.method;
    }

    getPath() {
        return this.path;
    }

    getValidators() {
        return this.validators;
    }

    async execute(req, res) {
        await this.operation(req, res);
    }

    toObject() {
        return {
            method: this.getMethod(),
            path: this.getPath(),
            validators: this.getValidators(),
            operation: async (req, res) => {
                await this.execute(req, res);
            },
        };
    }

    wrapOperation(wrapper) {

        const wrappedOperation = wrapper(async (req, res) => {
            await this.execute(req, res);
        });
        return new Endpoint(
            this.getMethod(), this.getPath(), wrappedOperation, this.getValidators(),
        );
    }

}

module.exports = Endpoint;
