import React, { useState } from 'react';
import axios from 'axios';

const SearchBox = ({ setAudioUrl }) => {
    const [query, setQuery] = useState('');

    const apiKey = 'AIzaSyAS2dwBxkWHjixnZT4Kf1zHDoO3uO_DbyU';

    const getVideoUrl = async (videoName) => {
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    q: videoName,
                    type: 'video',
                    key: apiKey,
                    maxResults: 1,
                },
            });

            if (response.data.items.length > 0) {
                const videoId = response.data.items[0].id.videoId;
                const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
                const audioUrl = `http://localhost:4000/download?url=${videoUrl}`;
                setAudioUrl(audioUrl);
            } else {
                alert('No video found for the given name.');
            }
        } catch (error) {
            console.error('Error fetching video URL:', error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query) {
            getVideoUrl(query);
        }
    };

    return (
        <div className="flex justify-center mt-8">
            <form onSubmit={handleSearch} className="w-full max-w-md">
                <div className="flex items-center border-b-2 border-blue-500 py-2">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        placeholder="Enter song name..."
                    />
                    <button
                        type="submit"
                        className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blu-700 text-sm border-4 text-white py-1 px-2 rounded"
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchBox;
