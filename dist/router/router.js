"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const models_1 = require("../models");
const userIDReg = /^\/api\/users\/[a-z0-9\-]+\/?$/;
const baseUrlReg = /^\/api\/users\/?$/;
const router = ({ method, endpoint, emitter, response, request }) => {
    if (!endpoint?.match(baseUrlReg) && !endpoint?.match(userIDReg)) {
        (0, utils_1.writeResponse)({ code: 404, response, data: 'PAGE NOUT FOUND', responseType: 'text' });
        return;
    }
    if (endpoint.match(baseUrlReg)) {
        if (method === 'GET') {
            (0, models_1.getUsersHandle)({ response, emitter });
        }
        else if (method === 'POST') {
            (0, models_1.createUserHandle)({ request, response, emitter });
        }
    }
    else if (method === 'GET') {
        (0, models_1.getUserByIDHandle)({ response, request, emitter });
    }
    else if (method === 'DELETE') {
        (0, models_1.deleteUserHandle)({ response, emitter, request });
    }
    else if (method === 'PUT') {
        (0, models_1.updateUserHandle)({ response, request, emitter });
    }
};
exports.default = router;
