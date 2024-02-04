import pepper from "./";
import {
    putItemHandler,
    getItemsHandler,
    openItemHandler,
    searchItemHandler,
    listRoutesHandler,
    addItemHandler,
    writeItemHandler,
    writeLogsToFileHandler,
    readLogsFromFileHandler,
} from "../handler";

import {
    ITEMS_ROUTE,
    OPEN_ITEM_ROUTE,
    SEARCH_ITEM_ROUTE,
    WRITE_ITEM_ROUTE,
    LIST_ROUTES_ROUTE,
    WRITE_LOGS_ROUTE,
    READ_LOGS_ROUTE,
} from "./consts";
import { addRouteToContext } from "./util";

// initialize server
const routes = pepper();
routes.createServer();

// TODO: set a proper informative index page
routes.get("/", (req, res) => {
    res?.writeHead(200, { "Content-Type": "text/html" });
    res?.write("Hello Api!");
    res?.end();
});

routes.get("/assets/meme", (req, res) => {
    const image = require("../assets/meme-welcome.png");
    res?.writeHead(200, { "Content-Type": "image/png" });
    res?.write(image);
    res?.end();
});

/**
 * get all context items
 *
 */
addRouteToContext("GET", ITEMS_ROUTE, "get all context items");
routes.get(ITEMS_ROUTE, (req, res) => getItemsHandler(req, res));

/**
 * open items file
 */
addRouteToContext("GET", OPEN_ITEM_ROUTE, "open items file");
routes.get(OPEN_ITEM_ROUTE, (req, res) => openItemHandler(req, res));

/**
 * search item by id
 */
addRouteToContext("GET", SEARCH_ITEM_ROUTE, "search item by id");
routes.get(SEARCH_ITEM_ROUTE, (req, res) => searchItemHandler(req, res));

/**
 * list routes from context
 */
addRouteToContext("GET", LIST_ROUTES_ROUTE, "list routes from context");
routes.get(LIST_ROUTES_ROUTE, (req, res) => listRoutesHandler(req, res));

/**
 * add item to context
 */
addRouteToContext("POST", ITEMS_ROUTE, "add item to context");
routes.post(ITEMS_ROUTE, (req, res) => addItemHandler(req, res));

/**
 * write context items into file
 */
addRouteToContext("POST", WRITE_ITEM_ROUTE, "write context items into file");
routes.post(WRITE_ITEM_ROUTE, (req, res) => writeItemHandler(req, res));

/**
 * write logs to file
 *
 * @param fileName
 *
 **/

addRouteToContext("POST", WRITE_LOGS_ROUTE, "write logs to file");
routes.post(WRITE_LOGS_ROUTE, (req, res) => writeLogsToFileHandler(req, res));

/**
 * read logs from file
 *
 */

addRouteToContext("GET", READ_LOGS_ROUTE, "read logs from file");
routes.get(READ_LOGS_ROUTE, (req, res) => readLogsFromFileHandler(req, res));

/**
 * update context item
 */
addRouteToContext("PUT", ITEMS_ROUTE, "update context item");
routes.put(ITEMS_ROUTE, (req, res) => putItemHandler(req, res));

export default routes;
