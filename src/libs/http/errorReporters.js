const addDetails = (error, details) => {

    const errorWithDetails = { ...error };
    if (typeof details === 'string') {
        errorWithDetails.message = details;
    } else
    if (typeof details === 'object') {
        errorWithDetails.details = details;
    }

    return errorWithDetails;
};

const report400 = (res, details) => {

    const error = addDetails({
        status: 400,
        reason: 'Bad Request',
    }, details);
    res.status(400).json({ error });
};

const report401 = (res, details) => {

    const error = addDetails({
        status: 401,
        reason: 'Unauthorized',
    }, details);
    res.status(401).json({ error });
};

const report404 = (res, details) => {

    const error = addDetails({
        status: 404,
        reason: 'Not Found',
    }, details);
    res.status(404).json({ error });
};

const report422 = (res, details) => {

    const error = addDetails({
        status: 422,
        reason: 'Conflict',
    }, details);
    res.status(422).json({ error });
};

const report500 = (res, details) => {

    const error = addDetails({
        status: 500,
        reason: 'Internal Server Error',
    }, details);
    res.status(500).json({ error });
};

module.exports = { report400, report401, report404, report422, report500 };
