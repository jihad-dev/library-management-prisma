"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next); // Automatically forward error to global error handler
    };
};
exports.default = catchAsync;
