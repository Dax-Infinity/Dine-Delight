const Paginate = (data, page, pageSize) => {
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedData = data.slice(startIndex, endIndex);

    return {
        pagination: {
            totalItems,
            totalPages,
            currentPage: page,
            pageSize,
        },
        data: paginatedData,
    };
};

module.exports = { Paginate }