import * as http from "node:http";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export type Router = {
    init: (server: http.Server, port: number, callback?: (req: http.IncomingMessage, res: http.ServerResponse) => void) => void;
    server?: http.Server;
    createServer(): void;
    routes?: Map<
        string,
        Map<
            Method,
            (req: http.IncomingMessage, res: http.ServerResponse) => void
        >
    >;
    get(
        path: string,
        handler: (req: http.IncomingMessage, res?: http.ServerResponse) => void
    ): void;
    post(
        path: string,
        handler: (req: http.IncomingMessage, res?: http.ServerResponse) => void
    ): void;
    put(
        path: string,
        handler: (req: http.IncomingMessage, res?: http.ServerResponse) => void
    ): void;
    delete(
        path: string,
        handler: (req: http.IncomingMessage, res?: http.ServerResponse) => void
    ): void;

 
};

const router = {} as Router;

router.createServer = function (this: Router) {
    if (!this.server) this.server = http.createServer();
};

router.get = function (this: Router, path, handler) {
    if (!this.routes) this.routes = new Map();
    if (!this.routes.has(path)) this.routes.set(path, new Map());
    this.routes.get(path)?.set("GET", handler);
};

router.post = function (this: Router, path, handler) {
    if (!this.routes) this.routes = new Map();
    if (!this.routes.has(path)) this.routes.set(path, new Map());
    this.routes.get(path)?.set("POST", handler);
};

router.put = function (this: Router, path, handler) {
    if (!this.routes) this.routes = new Map();
    if (!this.routes.has(path)) this.routes.set(path, new Map());
    this.routes.get(path)?.set("PUT", handler);
};

router.delete = function (this: Router, path, handler) {
    if (!this.routes) this.routes = new Map();
    if (!this.routes.has(path)) this.routes.set(path, new Map());
    this.routes.get(path)?.set("DELETE", handler);
};

router.createServer = function (this: Router) {
    this.server = http.createServer((req, res) => ({ req, res }));
};

router.init = function (
    this: Router,
    server: http.Server,
    port: number,
    callback?
) {
    this.server = server;

    server.on("request", (req, res) => {

        const url = new URL(req.url || "/", `http://${req.headers.host}`);
        const method = req.method as Method;

        const handler = this.routes?.get(String(url.pathname))?.get(method);
    
        handler?.(req, res);
        
        if (callback) callback(req, res);
    
    });


    server.listen(port);
};

export default function slash() {
    return router as Router;
}
