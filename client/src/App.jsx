import React, { useState } from 'react';
import SearchBox from './components/SearchBox';
import MusicPlayer from './components/MusicPlayer';
import NetworkStatusToast from './components/NetworkStatusToast.';

function App() {
    const [audioUrl, setAudioUrl] = useState('');

    return (
        <div className="App p-4">
            <header className="App-header">
                <h1 className="text-4xl font-bold my-4">Music Player</h1>
            </header>
            <SearchBox setAudioUrl={setAudioUrl} />
            <MusicPlayer audioUrl={audioUrl} />
            <NetworkStatusToast />
        </div>
    );
}

export default App;
