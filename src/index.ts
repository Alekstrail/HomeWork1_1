
import express, {Request, Response} from 'express'
const app = express()
const port = 3003


enum availableResolutions {
    P144, P240, P360, P480, P720, P1080, P1440, P2160
}
let videos = [
    {
        id:1,
        title: "Film",
        author: "John",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-03-29T18:54:38.570Z",
        publicationDate: "2023-03-29T18:54:38.570Z",
        availableResolutions: [
            "P144"
        ]
    }
]

app.get('/', (req:Request, res: Response) => {
    res.send('Hello Samurays!')
})

app.get('/videos', (req:Request, res: Response) => {
    res.send(videos)
})

app.post('/videos', (req:Request, res: Response) => {
    let title = req.body.title
    let author = req.body.author
    if (!title || typeof title !== "string" || title.length > 40 || author.length>20) {
        res.status(400).send({
            errorsMessages: [{
                'message': "Incorrect",
                'field': "title"
            }],
            resultCode: 1
        })
    return
}


    const newVideos = {id: +(new Date()),
        title: title,
        author: "Pol",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-03-30T18:54:38.570Z",
        publicationDate: "2023-03-30T18:54:38.570Z",
        availableResolutions: [
            "P144"
        ]
    }
    videos.push(newVideos)

    res.status(201).send(videos)
})

app.get('/:id', (req:Request, res: Response) => {

    let video = videos.find(p => p.id === +req.params.id)
    if (video) {
        res.send(video)
    } else {
        res.send(404)
    }

})
app.put('/:id', (req:Request, res: Response) => {
    if (!req.body.title) {
        res.sendStatus(400)
        return;
    }
    let foundVideo = videos.find(p => p.id === +req.params.id)
    if (!foundVideo) {
        res.sendStatus(404)
        return;
    }

        foundVideo.title = req.body.title

        res.send(foundVideo)


})

app.delete('/:id', (req:Request, res: Response) => {
    for (let i=0; i< videos.length;i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i,1);
            res.send(204);
            return;
        }
    }
    res.send(404)

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})