"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
var availableResolutions;
(function (availableResolutions) {
    availableResolutions[availableResolutions["P144"] = 0] = "P144";
    availableResolutions[availableResolutions["P240"] = 1] = "P240";
    availableResolutions[availableResolutions["P360"] = 2] = "P360";
    availableResolutions[availableResolutions["P480"] = 3] = "P480";
    availableResolutions[availableResolutions["P720"] = 4] = "P720";
    availableResolutions[availableResolutions["P1080"] = 5] = "P1080";
    availableResolutions[availableResolutions["P1440"] = 6] = "P1440";
    availableResolutions[availableResolutions["P2160"] = 7] = "P2160";
})(availableResolutions || (availableResolutions = {}));
let videos = [
    {
        id: 1,
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
];
app.get('/', (req, res) => {
    res.send('Hello Samurays!');
});
app.get('/videos', (req, res) => {
    res.send(videos);
});
app.post('/videos', (req, res) => {
    let title = req.body.title;
    let author = req.body.author;
    if (!title || typeof title !== "string" || title.length > 40 || author.length > 20) {
        res.status(400).send({
            errorsMessages: [{
                    'message': "Incorrect",
                    'field': "title"
                }],
            resultCode: 1
        });
        return;
    }
    const newVideos = { id: +(new Date()),
        title: title,
        author: "Pol",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-03-30T18:54:38.570Z",
        publicationDate: "2023-03-30T18:54:38.570Z",
        availableResolutions: [
            "P144"
        ]
    };
    videos.push(newVideos);
    res.status(201).send(videos);
});
app.get('/:id', (req, res) => {
    let video = videos.find(p => p.id === +req.params.id);
    if (video) {
        res.send(video);
    }
    else {
        res.send(404);
    }
});
app.put('/:id', (req, res) => {
    let video = videos.find(p => p.id === +req.params.id);
    if (video) {
        videos.title = req.body.title;
        res.send(video);
    }
    else {
        res.send(404);
    }
});
app.delete('/:id', (req, res) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
