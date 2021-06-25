"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
function errorHandler(error, res) {
    if (!error.hasOwnProperty("details")) {
        error = new types_1.CustomError(error);
    }
    console.log(error);
    switch (error.details[0].type) {
        case "any.required":
        case "string.empty":
        case "string.min":
        case "string.length":
        case "string.base":
        case "number.min":
        case "number.base":
        case "date.base":
        case "DateTimeParseError":
        case "string.email":
            res.status(400).send(error.details[0].message);
            break;
        case "string.guid":
        case "Unauthorized":
            res.status(401).send(error.details[0].message);
            break;
        case "not found":
            res.status(404).send(error.details[0].message);
            break;
        case "existent":
            res.status(409).send(error.details[0].message);
            break;
        default:
            res.status(500).send(error.details[0].message);
            break;
    }
}
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map