"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError {
    constructor(type, message = "error") {
        this.details = [
            {
                type,
                message,
            },
        ];
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=types.js.map