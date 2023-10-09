import express, {Request, Response} from 'express'
import {CreateVideoInputModel} from "./models/CreateVideoInputModel";
import {RequestsWithBody, RequestsWithParams} from "./types/types";
import {UpdateVideoInputModelOk} from "./models/UpdateVideoInputModel";

const app = express()
const port = 3000

export enum availableResolutionsType {
    P144 = 'P144',
    P240 = 'P240',
    P360 = 'P360',
    P480 = 'P480',
    P720 = 'P720',
    P1080 = 'P1080',
    P1440 = 'P1440',
    P2160 = 'P2160'
}

type dbVideoType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded?: boolean,
    minAgeRestriction?: number | null,
    createdAt?: string,
    publicationDate?: string,
    availableResolutions?: availableResolutionsType
}

let defaultVideo: dbVideoType[] = [
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
export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
}

function dbVideoTypeMinAgeRestriction(minAgeRestriction: number) {
    return minAgeRestriction >= 1 && minAgeRestriction <= 18;
}

const InputModelTitleOk = (title: string) => {
    return title.length <= 40
}
const InputModelAuthorOk = (author: string) => {
    return author.length <= 20
}
app.get('/', (req, res) => {
    res.send('Hellosad World!')
})
app.get('/videos', (req: Request, res: Response) => {
    res.status(HTTP_STATUSES.OK_200).send(defaultVideo)
})
app.post('/videos', (req: RequestsWithBody<CreateVideoInputModel>, res: Response) => {
    if (!InputModelTitleOk(req.body.title)) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [{
                message: "Incorrect title",
                field: "title"
            }]
        })
        return;
    }
    if (!InputModelAuthorOk(req.body.author)) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [{
                message: "Incorrect author",
                field: "title"
            }]
        })
        return;
    }
    const video: dbVideoType = {
        id: +new Date(),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: req.body.availableResolutions
    }
    defaultVideo.push(video)
    res.status(HTTP_STATUSES.CREATED_201).send(video)
})
app.get('/videos/:id', (req: Request, res: Response) => {
    const gg = defaultVideo.find(c => c.id === +req.params.id)
    if (!gg) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }

    res.status(HTTP_STATUSES.OK_200).send(gg)
})
app.put('/videos/:id', (req: Request, res: Response) => {
    if (!UpdateVideoInputModelOk(req.body.title, req.body.author, req.body.minAgeRestriction)) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [{
                message: "Incorrect title",
                field: "title"
            }]
        })
        return;
    }
    const gg = defaultVideo.find(c => c.id === +req.params.id)
    if (!gg) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    gg.title = req.body.title
    gg.author = req.body.author
    gg.minAgeRestriction = req.body.minAgeRestriction
    gg.canBeDownloaded = req.body.canBeDownloaded
    gg.availableResolutions = req.body.availableResolutions
    gg.publicationDate = req.body.publicationDate
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})
app.delete('/videos/:id', (req: Request, res: Response) => {
    const gg = defaultVideo.find(c => c.id === +req.params.id)
    if (!gg) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    defaultVideo = defaultVideo.filter(c => c.id !== +req.params.id)
    res.status(HTTP_STATUSES.NO_CONTENT_204).send(gg)
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})