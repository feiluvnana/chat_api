export class LoggerUtils {
    static e(data: object): void {
        data = {
            ...data,
            "ts": Date.now()
        };
        let str = JSON.stringify(data, null, 2);
        console.log(`\x1b[1m\x1b[31m[Error ❌] ${str}\x1b[0m`);
    }

    static d(data: object): void {
        data = {
            ...data,
            "ts": Date.now()
        };
        let str = JSON.stringify(data, null, 2);
        console.log(`\x1b[1m\x1b[34m[Debug 🛠️] ${str}\x1b[0m`);
    }

    static v(data: object): void {
        data = {
            ...data,
            "ts": Date.now()
        };
        let str = JSON.stringify(data, null, 2);
        console.log(`\x1b[38;2;253;182;0m\x1b[1m[Verbose 💬] ${str}\x1b[0m`);
    }

    static i(data: string): void {
        let str = data + " " + `[Happened at ${Date.now()}]`;
        console.log(`\x1b[1m\x1b[38;2;145;231;255m[Info 📌] ${str}\x1b[0m`);
    }

    static w(data: object): void {
        data = {
            ...data,
            "ts": Date.now()
        };
        let str = JSON.stringify(data, null, 2);
        console.log(`\x1b[1m\x1b[33m[Warning ⚠️] ${str}\x1b[0m`);
    }

    static a(data: object): void {
        data = {
            ...data,
            "ts": Date.now()
        };
        let str = JSON.stringify(data, null, 2);
        console.log(`\x1b[1m\x1b[32m[Assert ✔️] ${str}\x1b[0m`);
    }

    static wtf(data: object): void {
        data = {
            ...data,
            "ts": Date.now()
        };
        let str = JSON.stringify(data, null, 2);
        console.log(`x1b[4m\x1b[1m\x1b[5m\x1b[37m[WTF!? 🤨] ${str}\x1b[0m`);
    }
}

