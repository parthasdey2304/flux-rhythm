import React, { useState, useRef, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';

const MusicPlayer = ({ audioUrl, nextTrack, previousTrack }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.audioEl.current.pause();
        } else {
            audioRef.current.audioEl.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.audioEl.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.audioEl.current.duration);
    };

    const handleSeek = (e) => {
        const newTime = (e.nativeEvent.offsetX / e.target.clientWidth) * duration;
        audioRef.current.audioEl.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.audioEl.current.addEventListener('timeupdate', handleTimeUpdate);
            audioRef.current.audioEl.current.addEventListener('loadedmetadata', handleLoadedMetadata);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.audioEl.current.removeEventListener('timeupdate', handleTimeUpdate);
                audioRef.current.audioEl.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
            }
        };
    }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-800 text-white flex flex-col items-center">
            {audioUrl && (
                <ReactAudioPlayer
                    src={audioUrl}
                    ref={audioRef}
                    onEnded={() => setIsPlaying(false)}
                    controls={false}
                />
            )}
            <div className="flex items-center space-x-4">
                <button onClick={previousTrack} className="text-2xl">⏮</button>
                <button
                    onClick={handlePlayPause}
                    className="text-2xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {isPlaying ? '⏸' : '▶'}
                </button>
                <button onClick={nextTrack} className="text-2xl">⏭</button>
            </div>
            <div className="w-full mt-2">
                <div className="w-full h-1 bg-gray-500" onClick={handleSeek}>
                    <div
                        className="h-1 bg-blue-500"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;