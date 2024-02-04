import * as http from "node:http";
import { type Router, type Method } from "./types";
import { welcomeConsole } from "./util";

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

    welcomeConsole();

    server.listen(port);
};

export default function pepper() {
    return router as Router;
}
