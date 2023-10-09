import express, {Request, Response} from 'express'
import {UpdateVideoInputModelOk} from "./models/UpdateVideoInputModel";

export const app = express()
const port = 4000
const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)
export enum availableResolutionsType {
    P144 = "P144",
    P240 = "P240",
    P360 = "P360",
    P480 = "P480",
    P720 = "P720",
    P1080 = "P1080",
    P1440 = "P1440",
    P2160 = "P2160"
}

type dbVideoType = {
    id: number,
    title: string | null,
    author: string | null,
    canBeDownloaded?: boolean,
    minAgeRestriction?: number | null,
    createdAt?: string,
    publicationDate?: string,
    availableResolutions?: availableResolutionsType
}
const currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 1);
const tomorrowISOString = currentDate.toISOString();
console.log(tomorrowISOString);
function addDays(date:Date, n:number){
    date.setDate(new Date().getDate() + n);
    return date
}
let defaultVideo: dbVideoType[] = [
    {
        id: 1,
        title: 'asdasdasddasas',
        author: 'Gabeasdssllasdasdsdaf',
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt :new Date().toISOString(),
        publicationDate: addDays(new Date(), 1).toISOString(),
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
    return title.length <= 40 && title != 'null' && title != '' && true
}
const InputModelAuthorOk = (author: string) => {
    return author.length <= 20  && author != 'null' && author != '' && true
}
app.get('/', (req, res) => {
    res.send('Hellosad World!')
})
app.get('/videos', (req: Request, res: Response) => {
    res.status(HTTP_STATUSES.OK_200).send(defaultVideo)
})
app.post('/videos', (req:Request, res: Response) => {
    if (!InputModelTitleOk(req.body.title)) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [{
                message: "Incorrect title",
                field: "titlss"
            }]
        })
        return;
    }
    if (!InputModelAuthorOk(req.body.author)) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [{
                message: "Incorrect author",
                field: "titless"
            }]
        })
        return;
    }
    let video: dbVideoType = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt :new Date().toISOString(),
        publicationDate: addDays(new Date(), 1).toISOString(),
        availableResolutions: req.body.availableResolutions
    };
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
                field: "stitles"
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
app.delete('/testing/all-data', (req: Request, res: Response) => {
    defaultVideo = []
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})