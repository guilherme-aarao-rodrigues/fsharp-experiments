import { Record } from "../ClientLib/fable_modules/fable-library.4.0.0-theta-001/Types.js";
import { record_type, class_type, string_type, int32_type } from "../ClientLib/fable_modules/fable-library.4.0.0-theta-001/Reflection.js";

export class Album extends Record {
    constructor(id, title, genre, released) {
        super();
        this.id = (id | 0);
        this.title = title;
        this.genre = genre;
        this.released = released;
    }
}

export function Album$reflection() {
    return record_type("SharedModels.Album", [], Album, () => [["id", int32_type], ["title", string_type], ["genre", string_type], ["released", class_type("System.DateTime")]]);
}

export class NewAlbumInfo extends Record {
    constructor(title, genre, released) {
        super();
        this.title = title;
        this.genre = genre;
        this.released = released;
    }
}

export function NewAlbumInfo$reflection() {
    return record_type("SharedModels.NewAlbumInfo", [], NewAlbumInfo, () => [["title", string_type], ["genre", string_type], ["released", class_type("System.DateTime")]]);
}

export class IMusicStore extends Record {
    constructor(test) {
        super();
        this.test = test;
    }
}

export function IMusicStore$reflection() {
    return record_type("SharedModels.IMusicStore", [], IMusicStore, () => [["test", class_type("Microsoft.FSharp.Control.FSharpAsync`1", [string_type])]]);
}

