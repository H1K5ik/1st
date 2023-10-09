"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUSES = exports.availableResolutionsType = exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const port = 4000;
const jsonBodyMiddleware = express_1.default.json();
exports.app.use(jsonBodyMiddleware);
var availableResolutionsType;
(function (availableResolutionsType) {
    availableResolutionsType["P144"] = "P144";
    availableResolutionsType["P240"] = "P240";
    availableResolutionsType["P360"] = "P360";
    availableResolutionsType["P480"] = "P480";
    availableResolutionsType["P720"] = "P720";
    availableResolutionsType["P1080"] = "P1080";
    availableResolutionsType["P1440"] = "P1440";
    availableResolutionsType["P2160"] = "P2160";
})(availableResolutionsType || (exports.availableResolutionsType = availableResolutionsType = {}));
const arrayOfAvRes = Object.values(availableResolutionsType);
const currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 1);
const tomorrowISOString = currentDate.toISOString();
console.log(tomorrowISOString);
function addDays(date, n) {
    date.setDate(new Date().getDate() + n);
    return date;
}
let defaultVideo = [
    {
        id: 1,
        title: 'asdasdasddasas',
        author: 'Gabeasdssllasdasdsdaf',
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: addDays(new Date(), 1).toISOString(),
        availableResolutions: availableResolutionsType.P144
    }
];
exports.HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
exports.app.get('/', (req, res) => {
    res.send('Hellosad World!');
});
exports.app.get('/videos', (req, res) => {
    res.status(exports.HTTP_STATUSES.OK_200).send(defaultVideo);
});
exports.app.post('/videos', (req, res) => {
    const errorsMessages = [];
    const title = req.body.title;
    const author = req.body.author;
    const availableResolution = req.body.availableResolutions; // []
    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        errorsMessages.push({
            message: "Incorrect title",
            field: "title"
        });
    }
    if (!author || typeof author !== 'string' || !author.trim() || author.length > 20) {
        errorsMessages.push({
            message: "Incorrect title",
            field: "author"
        });
    }
    let c = 0;
    if (!availableResolution.length) {
        errorsMessages.push({
            message: "Incorrect title",
            field: `availableResolutions`
        });
    }
    for (let i = 0; i < arrayOfAvRes.length; i++) {
        for (let m = 0; m < availableResolution.length; m++) {
            if (typeof availableResolution[m] !== 'string') {
                errorsMessages.push({
                    message: "Incorrect title",
                    field: `availableResolutions`
                });
            }
            if (arrayOfAvRes[i] === availableResolution[m]) {
                c++;
            }
        }
    }
    if (c < availableResolution.length) {
        errorsMessages.push({
            message: "Incorrect title",
            field: `availableResolutions`
        });
    }
    //TODO: validate availableResolution
    //fapfolder
    if (errorsMessages.length) {
        res.status(exports.HTTP_STATUSES.BAD_REQUEST_400).send({ errorsMessages });
        return;
    }
    const date = new Date();
    const video = {
        id: +date,
        title,
        author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: date.toISOString(),
        publicationDate: addDays(date, 1).toISOString(),
        availableResolutions: req.body.availableResolutions
    };
    defaultVideo.push(video);
    res.status(exports.HTTP_STATUSES.CREATED_201).send(video);
});
exports.app.get('/videos/:id', (req, res) => {
    const gg = defaultVideo.find(c => c.id === +req.params.id);
    if (!gg) {
        res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.status(exports.HTTP_STATUSES.OK_200).send(gg);
});
exports.app.put('/videos/:id', (req, res) => {
    const errorsMessages = [];
    const title = req.body.title;
    const author = req.body.author;
    const availableResolution = req.body.availableResolutions; // []
    const age = req.body.minAgeRestriction;
    const can = req.body.canBeDownloaded;
    if (!title || typeof title !== 'string' || !title.trim() || (title.length > 40)) {
        errorsMessages.push({
            message: "Incorrect title",
            field: "title"
        });
    }
    if (!author || typeof author !== 'string' || !author.trim() || (author.length > 20)) {
        errorsMessages.push({
            message: "Incorrect title",
            field: "author"
        });
    }
    let c = 0;
    if (!availableResolution.length) {
        errorsMessages.push({
            message: "Incorrect title",
            field: `availableResolutions`
        });
    }
    for (let i = 0; i < arrayOfAvRes.length; i++) {
        for (let m = 0; m < availableResolution.length; m++) {
            if (typeof availableResolution[m] !== 'string') {
                errorsMessages.push({
                    message: "Incorrect title",
                    field: `availableResolutions`
                });
            }
            if (arrayOfAvRes[i] === availableResolution[m]) {
                c++;
            }
        }
    }
    if (c < availableResolution.length) {
        errorsMessages.push({
            message: "Incorrect title",
            field: `availableResolutions`
        });
    }
    if (!age || typeof age !== 'number' || !(age >= 1) || !(age <= 18)) {
        errorsMessages.push({
            message: "Incorrect title",
            field: "age"
        });
    }
    if (!can || typeof can !== 'boolean') {
        errorsMessages.push({
            message: "Incorrect title",
            field: "canBeDownloaded"
        });
    }
    //TODO: validate availableResolutions
    //fapfolder
    if (errorsMessages.length) {
        res.status(exports.HTTP_STATUSES.BAD_REQUEST_400).send({ errorsMessages });
        return;
    }
    const gg = defaultVideo.find(c => c.id === +req.params.id);
    if (!gg) {
        res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    gg.title = req.body.title;
    gg.author = req.body.author;
    gg.minAgeRestriction = req.body.minAgeRestriction;
    gg.canBeDownloaded = req.body.canBeDownloaded;
    gg.availableResolutions = req.body.availableResolutions;
    gg.publicationDate = req.body.publicationDate;
    res.sendStatus(exports.HTTP_STATUSES.NO_CONTENT_204);
});
exports.app.delete('/videos/:id', (req, res) => {
    const gg = defaultVideo.find(c => c.id === +req.params.id);
    if (!gg) {
        res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    defaultVideo = defaultVideo.filter(c => c.id !== +req.params.id);
    res.status(exports.HTTP_STATUSES.NO_CONTENT_204).send(gg);
});
exports.app.delete('/testing/all-data', (req, res) => {
    defaultVideo = [];
    res.sendStatus(exports.HTTP_STATUSES.NO_CONTENT_204);
});
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
