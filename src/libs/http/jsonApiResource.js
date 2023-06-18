const jsonApiResource = (obj) => {
    const { id, ...rest } = obj;
    return { id, attributes: { ...rest } };
};

module.exports = jsonApiResource;
