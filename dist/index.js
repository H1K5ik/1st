"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUSES = exports.availableResolutionsType = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const UpdateVideoInputModel_1 = require("./models/UpdateVideoInputModel");
exports.app = (0, express_1.default)();
const port = 3000;
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
const currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 1);
const tomorrowISOString = currentDate.toISOString();
console.log(tomorrowISOString);
let defaultVideo = [
    {
        id: 1,
        title: 'asdasdasddasas',
        author: 'Gabeasdssllasdasdsdaf',
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: currentDate.toISOString(),
        publicationDate: tomorrowISOString,
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
function dbVideoTypeMinAgeRestriction(minAgeRestriction) {
    return minAgeRestriction >= 1 && minAgeRestriction <= 18;
}
const InputModelTitleOk = (title) => {
    return title.length <= 40;
};
const InputModelAuthorOk = (author) => {
    return author.length <= 20;
};
exports.app.get('/', (req, res) => {
    res.send('Hellosad World!');
});
exports.app.get('/videos', (req, res) => {
    res.status(exports.HTTP_STATUSES.OK_200).send(defaultVideo);
});
exports.app.post('/videos', (req, res) => {
    if (!InputModelTitleOk(req.body.title)) {
        res.status(exports.HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [{
                    message: "Incorrect title",
                    field: "titlss"
                }]
        });
        return;
    }
    if (!InputModelAuthorOk(req.body.author)) {
        res.status(exports.HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [{
                    message: "Incorrect author",
                    field: "titless"
                }]
        });
        return;
    }
    let video = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
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
    if (!(0, UpdateVideoInputModel_1.UpdateVideoInputModelOk)(req.body.title, req.body.author, req.body.minAgeRestriction)) {
        res.status(exports.HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [{
                    message: "Incorrect title",
                    field: "stitles"
                }]
        });
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
