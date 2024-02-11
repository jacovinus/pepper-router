/**
 * router default routes
 **/

// context items
const ITEMS_ = "/items";
const ITEM_SEARCH_ = `${ITEMS_}/search`;

//  write context items to file
const ITEMS_WRITE_ = `${ITEMS_}/write`;
const ITEMS_READ_ = `${ITEMS_}/read`;

// routes stored at context
const ROUTES_LIST_ = "routes/list";

// log items
const LOGS_ = "/logs";

// read / write logs into file
const LOGS_WRITE_ = "/logs/write";
const LOGS_READ_ = "/logs/read";

export {
    // context items
    ITEMS_,
    ITEM_SEARCH_,
    ITEMS_WRITE_,
    ITEMS_READ_,
    // routes
    ROUTES_LIST_,
    // logs
    LOGS_,
    LOGS_WRITE_,
    LOGS_READ_,
};
