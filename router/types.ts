import {
    type Server,
    type ServerResponse,
    type IncomingMessage,
} from "node:http";

type Method = "GET" | "POST" | "PUT" | "DELETE";
type ServerFn = (req: IncomingMessage, res: ServerResponse) => void;
type RouterInitFn = (server: Server, port: number, callback?: ServerFn) => void;
type RoutesMap = Map<string, Map<Method, ServerFn>>;

type LogLine = {
    type: "log";
    text: string;
    created: number;
};

type RouteListItem = {
    type: "route";
    method: Method;
    path: string;
    description: string;
};

type Router = {
    init: RouterInitFn;
    server?: Server;
    createServer(): void;
    routes?: RoutesMap;
    get(path: string, handler: ServerFn): void;
    post(path: string, handler: ServerFn): void;
    put(path: string, handler: ServerFn): void;
    delete(path: string, handler: ServerFn): void;
};

export { Router, Method, RouteListItem, LogLine };
