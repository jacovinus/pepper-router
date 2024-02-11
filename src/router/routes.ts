import pepper from "./";
import {
    // context items
    addItemHandler,
    getItemsHandler,
    searchItemHandler,
    putItemHandler,
    deleteItemHandler,
    // read / write context items to file
    writeItemsHandler,
    readItemsHandler,
    // routes
    listRoutesHandler,
    // logs
    readLogsFromContextHandler,
    writeLogsToFileHandler,
    readLogsFromFileHandler,
} from "../handler";

import {
    ITEMS_,
    ITEM_SEARCH_,
    ITEMS_WRITE_,
    ITEMS_READ_,
    ROUTES_LIST_,
    LOGS_,
    LOGS_WRITE_,
    LOGS_READ_,
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

/**
 * get all context items
 *
 */
addRouteToContext("GET", ITEMS_, "get all context items");
routes.get(ITEMS_, (req, res) => getItemsHandler(req, res));

/**
 * search item by id
 */
addRouteToContext("GET", ITEM_SEARCH_, "search item by id");
routes.get(ITEM_SEARCH_, (req, res) => searchItemHandler(req, res));

/**
 * add item to context
 */
addRouteToContext("POST", ITEMS_, "add item to context");
routes.post(ITEMS_, (req, res) => addItemHandler(req, res));

/**
 * update context item
 */
addRouteToContext("PUT", ITEMS_, "update context item");
routes.put(ITEMS_, (req, res) => putItemHandler(req, res));

/**
 * delete context item
 */
addRouteToContext("DELETE", ITEMS_, "delete context item");
routes.delete(ITEMS_, (req, res) => deleteItemHandler(req, res));

// read / write context items to file

/**
 * open items file
 */
addRouteToContext("GET", ITEMS_READ_, "read items file");
routes.get(ITEMS_READ_, (req, res) => readItemsHandler(req, res));

/**
 * write context items into file
 */
addRouteToContext("POST", ITEMS_WRITE_, "write context items into file");
routes.post(ITEMS_WRITE_, (req, res) => writeItemsHandler(req, res));

/**
 * list routes from context
 */
addRouteToContext("GET", ROUTES_LIST_, "list routes from context");
routes.get(ROUTES_LIST_, (req, res) => listRoutesHandler(req, res));

/**
 * read logs from context 
 * 
 */
addRouteToContext("GET", LOGS_, "read logs from context");
routes.get(LOGS_, (req, res) => readLogsFromContextHandler(req, res));


/**
 * write logs to file
 *
 * @param fileName
 *
 **/
addRouteToContext("POST", LOGS_WRITE_, "write logs to file");
routes.post(LOGS_WRITE_, (req, res) => writeLogsToFileHandler(req, res));

/**
 * read logs from file
 *
 */
addRouteToContext("GET", LOGS_READ_, "read logs from file");
routes.get(LOGS_READ_, (req, res) => readLogsFromFileHandler(req, res));

export default routes;
