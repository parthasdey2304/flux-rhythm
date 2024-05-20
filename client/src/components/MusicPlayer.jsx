import React, { useState, useRef } from 'react';
import ReactAudioPlayer from 'react-audio-player';

const MusicPlayer = ({ audioUrl }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.audioEl.current.pause();
        } else {
            audioRef.current.audioEl.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="flex flex-col items-center mt-8">
            {audioUrl && (
                <ReactAudioPlayer
                    src={audioUrl}
                    ref={audioRef}
                    onEnded={() => setIsPlaying(false)}
                    controls
                />
            )}
            <button
                onClick={handlePlayPause}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    );
};

export default MusicPlayer;
