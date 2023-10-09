"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUSES = exports.availableResolutionsType = void 0;
const express_1 = __importDefault(require("express"));
const UpdateVideoInputModel_1 = require("./models/UpdateVideoInputModel");
const app = (0, express_1.default)();
const port = 3000;
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
let defaultVideo = [
    {
        id: 1,
        title: 'asdasdasddasas',
        author: 'Gabeasdsllf',
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
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
app.get('/', (req, res) => {
    res.send('Hellosad World!');
});
app.get('/videos', (req, res) => {
    res.status(exports.HTTP_STATUSES.OK_200).send(defaultVideo);
});
app.post('/videos', (req, res) => {
    if (!InputModelTitleOk(req.body.title)) {
        res.status(exports.HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [{
                    message: "Incorrect title",
                    field: "title"
                }]
        });
        return;
    }
    if (!InputModelAuthorOk(req.body.author)) {
        res.status(exports.HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [{
                    message: "Incorrect author",
                    field: "title"
                }]
        });
        return;
    }
    const video = {
        id: +new Date(),
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
app.get('/videos/:id', (req, res) => {
    const gg = defaultVideo.find(c => c.id === +req.params.id);
    if (!gg) {
        res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.status(exports.HTTP_STATUSES.OK_200).send(gg);
});
app.put('/videos/:id', (req, res) => {
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
app.delete('/videos/:id', (req, res) => {
    const gg = defaultVideo.find(c => c.id === +req.params.id);
    if (!gg) {
        res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    defaultVideo = defaultVideo.filter(c => c.id !== +req.params.id);
    res.status(exports.HTTP_STATUSES.NO_CONTENT_204).send(gg);
});
app.delete('/all-data', (req, res) => {
    defaultVideo = [];
    res.status(exports.HTTP_STATUSES.NO_CONTENT_204);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
