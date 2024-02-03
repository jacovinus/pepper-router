import { IncomingMessage, ServerResponse } from "node:http";
import context from "../context/ctx";
import * as fs from "fs";

export type Handler = (
    req: IncomingMessage,
    res: ServerResponse | undefined
) => void;

/**
 *  PUT /items
 * 
 * update item in context
 * 
 * 
 */
const putItemHandler: Handler = (req, res) => {
    const body = [] as Buffer[];
    req.on("data", (chunk: any) => body.push(chunk));
    req.on("end", () => {
        const item = JSON.parse(Buffer.concat(body).toString());
        context.update(item);
        res?.writeHead(200, { "Content-Type": "application/json" });
        res?.write(JSON.stringify(item));
        res?.end();
    });
};


/**
 * GET /items
 * 
 * return all items in context
 * **/
const getItemsHandler: Handler = (req, res) => {
    res?.writeHead(200, { "Content-Type": "application/json" });
    res?.write(JSON.stringify(context.getAll()));
    res?.end();
};

/**
 * GET /items/open/file={file}
 * 
 * opens items file and return its content
 * 
 * 
 */
const openItemHandler: Handler = (req, res) => {
    const url = new URL(req?.url || "/", "http://localhost");
    const file = url.searchParams.get("file") as string;
    const fileOpen = fs.readFileSync(file, "utf8");
    if (fileOpen.length > 0) {
        res?.writeHead(200, { "Content-Type": "application/json" });
        res?.write(fileOpen);
        res?.end();
    } else {
        res?.writeHead(404, { "Content-Type": "text/plain" });
        res?.write("File not found");
        res?.end();
    }
};

/**
 * GET /items/search?id={id}
 * 
 * return item by id
 *
 * 
 * */
const searchItemHandler: Handler = (req, res) => {
    const url = new URL(req?.url || "/", "http://localhost");
    const searchParams = new URLSearchParams(url?.searchParams);
    const id = searchParams.get("id") as string;
    const item = context.get(id);
    res?.writeHead(200, { "Content-Type": "application/json" });
    res?.write(JSON.stringify(item));
    res?.end();
};

/**
 * POST /items 
 * 
 * adds new item to context
 * 
 * 
 */
const addItemHandler: Handler = (req, res) => {
    const body = [] as Buffer[];
    req.on("data", (chunk: any) => body.push(chunk));
    req.on("end", () => {
        const item = JSON.parse(Buffer.concat(body).toString());
        context.add(item);
        res?.writeHead(200, { "Content-Type": "application/json" });
        res?.write(JSON.stringify(item));
        res?.end();
    });
};

/**
 * POST /items/write/file={file}
 * 
 * write items to file
 * 
 * 
 */
const writeItemHandler: Handler = (req, res) => {
    const url = new URL(req?.url || "/", "http://localhost");
    const file = url.searchParams.get("file") as string;
    const items = context.getAll();
    fs.writeFileSync(file, JSON.stringify(items));
    res?.writeHead(200, { "Content-Type": "text/html" });
    res?.write(`200 OK file ${file} written`);
    res?.end();
};

export {
    putItemHandler,
    getItemsHandler,
    openItemHandler,
    searchItemHandler,
    addItemHandler,
    writeItemHandler,
};
