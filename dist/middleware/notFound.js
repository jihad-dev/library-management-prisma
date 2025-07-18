"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `🔍 Not Found - ${req.originalUrl}`,
    });
};
exports.default = notFound;
