import { Record } from "../ClientLib/fable_modules/fable-library.4.0.0-theta-001/Types.js";
import { int32 } from "../ClientLib/fable_modules/fable-library.4.0.0-theta-001/Int32.js";
import { record_type, class_type, string_type, int32_type, TypeInfo } from "../ClientLib/fable_modules/fable-library.4.0.0-theta-001/Reflection.js";

export class Album extends Record {
    id: int32;
    title: string;
    genre: string;
    released: Date;
    constructor(id: int32, title: string, genre: string, released: Date) {
        super();
        this.id = (id | 0);
        this.title = title;
        this.genre = genre;
        this.released = released;
    }
}

export function Album$reflection(): TypeInfo {
    return record_type("SharedModels.Album", [], Album, () => [["id", int32_type], ["title", string_type], ["genre", string_type], ["released", class_type("System.DateTime")]]);
}

export class NewAlbumInfo extends Record {
    title: string;
    genre: string;
    released: Date;
    constructor(title: string, genre: string, released: Date) {
        super();
        this.title = title;
        this.genre = genre;
        this.released = released;
    }
}

export function NewAlbumInfo$reflection(): TypeInfo {
    return record_type("SharedModels.NewAlbumInfo", [], NewAlbumInfo, () => [["title", string_type], ["genre", string_type], ["released", class_type("System.DateTime")]]);
}

export class IMusicStore extends Record {
    test: any;
    constructor(test: any) {
        super();
        this.test = test;
    }
}

export function IMusicStore$reflection(): TypeInfo {
    return record_type("SharedModels.IMusicStore", [], IMusicStore, () => [["test", class_type("Microsoft.FSharp.Control.FSharpAsync`1", [string_type])]]);
}

