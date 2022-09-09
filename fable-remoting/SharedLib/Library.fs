
module SharedModels

open System 

type Album = {
    id: int
    title: string
    genre: string
    released: DateTime
}

type NewAlbumInfo = {
    title: string
    genre: string
    released: DateTime
}

// The shared interface representing your client-server interaction
type IMusicStore = {
    test: Async<string>
    // popularAlbums : Async<list<Album>> 
    // allAlbums : Async<list<Album>> 
    // albumById : int -> Async<Option<Album>>
    // createAlbum : NewAlbumInfo -> Async<Option<Album>>
}
