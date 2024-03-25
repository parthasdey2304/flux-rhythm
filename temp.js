const YoutubeMusicApi = require('youtube-music-api')

const api = new YoutubeMusicApi()
api.initalize() // Retrieves Innertube Config
.then(info => {
	// api.getSearchSuggestions("KRSNA").then(result => {
	// 	console.log(result)
	// })

	// api.search("KRSNA").then(result => {
	// 	console.log(result)
	// })
	api.search("KRSNA", "song").then(result => console.log(result)) // just search for songs
	// api.search("KRSNA", "video").then(result => console.log(result)) // just search for video
	// api.search("KRSNA", "album").then(result => console.log(result)) // just search for album
	// api.search("KRSNA", "artist").then(result => console.log(result)) // just search for artist
	// api.search("KRSNA", "playlist").then(result => console.log(result)) // just search for playlist

	// api.getAlbum("MPREb_9TuSrHElFSO").then(result => {
	// 	console.log(result)
	// })

	// api.getArtist("UCCvxgd2z194wYgpBt-sajrA").then(result => {
	//     console.log(result)
	// })

	// api.getPlaylist("VLPLTw3BBwcLBjG-4fernx2Xt-GHdYMPYAFM").then(result => {
	//     console.log(result)
	// })
})