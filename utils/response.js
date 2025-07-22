class ApiResponse {
    static success(res, data, message = 'Success', statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
            timestamp: new Date().toISOString()
        });
    }

    static error(res, message = 'Internal Server Error', statusCode = 500, errors = null) {
        return res.status(statusCode).json({
            success: false,
            message,
            errors,
            timestamp: new Date().toISOString()
        });
    }

    static paginated(res, data, pagination, message = 'Success', statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
            pagination: {
                currentPage: pagination.page,
                totalPages: Math.ceil(pagination.total / pagination.limit),
                totalItems: pagination.total,
                itemsPerPage: pagination.limit,
                hasNextPage: pagination.page < Math.ceil(pagination.total / pagination.limit),
                hasPrevPage: pagination.page > 1
            },
            timestamp: new Date().toISOString()
        });
    }
}

module.exports = ApiResponse;
