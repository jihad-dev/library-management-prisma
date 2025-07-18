"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_route_1 = require("../modules/Book/book.route");
const member_route_1 = require("../modules/Member/member.route");
const borrow_route_1 = require("../modules/Borrow/borrow.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/books',
        route: book_route_1.bookRoutes
    },
    {
        path: '/members',
        route: member_route_1.memberRoutes
    },
    {
        path: '/',
        route: borrow_route_1.borrowRoutes
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
