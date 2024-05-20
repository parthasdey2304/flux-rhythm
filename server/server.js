const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');
const path = require('path');

const app = express();
const apiPort = 4000; // Port for the API
const clientPort = 3000; // Port for the React client

app.use(cors());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// API route for downloading YouTube audio
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

// Serve the React app for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(apiPort, () => {
    console.log(`API server is running on http://localhost:${apiPort}`);
    console.log(`React app is served on http://localhost:${clientPort}`);
});
