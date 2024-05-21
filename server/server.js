const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());

app.get('/download', async (req, res) => {
    const videoUrl = req.query.url;
    if (!ytdl.validateURL(videoUrl)) {
        return res.status(400).send('Invalid URL');
    }

    const info = await ytdl.getInfo(videoUrl);
    const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

    res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp3"`);
    ytdl(videoUrl, { format: audioFormat }).pipe(res);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});