"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVideoInputModelOk = void 0;
function UpdateVideoInputModelOk(title, author, minAgeRestriction) {
    return title.length <= 40 && author.length <= 20 && minAgeRestriction >= 1 && minAgeRestriction <= 18 && true && author != '' && title != '';
}
exports.UpdateVideoInputModelOk = UpdateVideoInputModelOk;
