import { fromContinuations } from "../fable-library.4.0.0-theta-001/Async.js";
import { class_type } from "../fable-library.4.0.0-theta-001/Reflection.js";
import { isNullOrWhiteSpace } from "../fable-library.4.0.0-theta-001/String.js";

export function InternalUtilities_toUInt8Array(data) {
    if (data instanceof Uint8Array) {
        return data;
    }
    else {
        return new Uint8Array(data);
    }
}

export function Browser_Types_File__File_ReadAsByteArray(instance) {
    return fromContinuations((tupledArg) => {
        const reader = new FileReader();
        reader.onload = ((_arg_2) => {
            if (reader.readyState === 2) {
                tupledArg[0](new Uint8Array(reader.result));
            }
        });
        reader.readAsArrayBuffer(instance);
    });
}

export function Browser_Types_File__File_ReadAsDataUrl(instance) {
    return fromContinuations((tupledArg) => {
        const reader = new FileReader();
        reader.onload = ((_arg_2) => {
            if (reader.readyState === 2) {
                tupledArg[0](reader.result);
            }
        });
        reader.readAsDataURL(instance);
    });
}

export function Browser_Types_File__File_ReadAsText(instance) {
    return fromContinuations((tupledArg) => {
        const reader = new FileReader();
        reader.onload = ((_arg_2) => {
            if (reader.readyState === 2) {
                tupledArg[0](reader.result);
            }
        });
        reader.readAsText(instance);
    });
}

export class ByteArrayExtensions {
    constructor() {
    }
}

export function ByteArrayExtensions$reflection() {
    return class_type("Fable.Remoting.Client.ByteArrayExtensions", void 0, ByteArrayExtensions);
}

export function ByteArrayExtensions_SaveFileAs_5EF83E14(content, fileName) {
    if (isNullOrWhiteSpace(fileName)) {
    }
    else {
        const binaryData = InternalUtilities_toUInt8Array(content);
        const blob = new Blob([binaryData.buffer], { type: "application/octet-stream" });
        const dataUrl = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.style = "display: none";
        anchor.href = dataUrl;
        anchor.download = fileName;
        anchor.rel = "noopener";
        anchor.click();
        anchor.remove();
        window.setTimeout(() => {
            URL.revokeObjectURL(dataUrl);
        }, 40 * 1000);
    }
}

export function ByteArrayExtensions_SaveFileAs_Z4C1C8351(content, fileName, mimeType) {
    if (isNullOrWhiteSpace(fileName)) {
    }
    else {
        const binaryData = InternalUtilities_toUInt8Array(content);
        const blob = new Blob([binaryData.buffer], { type: mimeType });
        const dataUrl = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.style = "display: none";
        anchor.href = dataUrl;
        anchor.download = fileName;
        anchor.rel = "noopener";
        anchor.click();
        anchor.remove();
        window.setTimeout(() => {
            URL.revokeObjectURL(dataUrl);
        }, 40 * 1000);
    }
}

export function ByteArrayExtensions_AsDataUrl_Z3F6BC7B1(content) {
    const binaryData = InternalUtilities_toUInt8Array(content);
    const blob = new Blob([binaryData.buffer], { type: "application/octet-stream" });
    return window.URL.createObjectURL(blob);
}

export function ByteArrayExtensions_AsDataUrl_5EF83E14(content, mimeType) {
    const binaryData = InternalUtilities_toUInt8Array(content);
    const blob = new Blob([binaryData.buffer], { type: mimeType });
    return window.URL.createObjectURL(blob);
}

