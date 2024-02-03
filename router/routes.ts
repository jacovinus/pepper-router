import slash from "./";
import {
    putItemHandler,
    getItemsHandler,
    openItemHandler,
    searchItemHandler,
    addItemHandler,
    writeItemHandler,
} from "../handler";

import {
    ITEMS_ROUTE,
    OPEN_ITEM_ROUTE,
    SEARCH_ITEM_ROUTE,
    WRITE_ITEM_ROUTE,
} from "./consts";


// initialize server
const routes = slash();
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
routes.get(ITEMS_ROUTE, (req, res) => getItemsHandler(req, res));

/**
 * open items file
 */
routes.get(OPEN_ITEM_ROUTE, (req, res) => openItemHandler(req, res));

/**
 * search item by id
 */
routes.get(SEARCH_ITEM_ROUTE, (req, res) => searchItemHandler(req, res));

/**
 * add item to context
 */
routes.post(ITEMS_ROUTE, (req, res) => addItemHandler(req, res));

/**
 * write context items into file
 */
routes.post(WRITE_ITEM_ROUTE, (req, res) => writeItemHandler(req, res));

/**
 * update context item
 */
routes.put(ITEMS_ROUTE, (req, res) => putItemHandler(req, res));

export default routes;
