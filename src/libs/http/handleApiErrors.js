const { validationResult } = require('express-validator');

const { report400 } = require('./errorReporters');

const handleApiErrors = (req, res) => {
    const errors = validationResult(req).formatWith(({ msg }) => msg);
    if (!errors.isEmpty()) {
        report400(res, errors.array());
        return false;
    } else {
        return true;
    }
};

module.exports = handleApiErrors;
