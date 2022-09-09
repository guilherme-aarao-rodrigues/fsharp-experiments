import { RemotingModule_createApi, Remoting_buildProxy_Z2B50D2A3 } from "./fable_modules/Fable.Remoting.Client.7.21.0/Remoting.fs.js";
import { startImmediate } from "./fable_modules/fable-library.4.0.0-theta-001/Async.js";
import { singleton } from "./fable_modules/fable-library.4.0.0-theta-001/AsyncBuilder.js";
import { printf, toConsole } from "./fable_modules/fable-library.4.0.0-theta-001/String.js";

export const musicStore = Remoting_buildProxy_Z2B50D2A3(RemotingModule_createApi());

startImmediate(singleton.Delay(() => singleton.Bind(musicStore.test, (_arg) => {
    toConsole(printf("Message: %s"))(_arg);
    return singleton.Zero();
})));

