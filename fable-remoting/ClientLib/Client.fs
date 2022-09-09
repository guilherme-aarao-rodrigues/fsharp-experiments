namespace ClientLib

open SharedModels
open Fable.Remoting.Client

module Say =

    // musicStore : IMusicStore
    let musicStore: IMusicStore =
        Remoting.createApi ()
        |> Remoting.buildProxy<IMusicStore>

    async {
        let! albums = musicStore.test
        printf "Message: %s" albums
    }
    |> Async.StartImmediate
