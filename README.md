

## Pepper Router

[![CodeQL](https://github.com/jacovinus/pepper-router/actions/workflows/CodeQL.yml/badge.svg?branch=main)](https://github.com/jacovinus/pepper-router/actions/workflows/CodeQL.yml)

🚧 Warning: this is just for fun, not to take it seriously at all. 

Just some playing with pure node and typescript (avoiding frameworks)

## Current features: 

### Context 
CRUD data into memory

---

### Router 
 <img src="./assets/Screenshot 2024-02-04 155258.png" width="600px" alt="routes">

 - By default it writes data into memory through context
 - It could write the context entries into file
 - It could open the written file and return it's content 
 - Routes are listed at welcome screen

 #### Usage: 

Writing a new Route: 

At `/router/routes.ts`:

- add a new route following this example: 

```js
addRouteToContext("GET", READ_LOGS_ROUTE, "read logs from file");
routes.get(READ_LOGS_ROUTE, (req, res) => readLogsFromFileHandler(req, res));
```
- add the `addRouteToContext` helper if you want to list it at welcome screen
- register the route with its method, path and handler

At `/handler/index.ts`:

- add a new handler following this examples: 

```js
// [GET] (no params)
const listRoutesHandler: Handler = (req, res) => {
    const routes = listRoutesFromContext();
    res?.writeHead(200, { "Content-Type": "application/json" });
    res?.write(JSON.stringify(routes));
    res?.end();
};

// [GET] with params
const searchItemHandler: Handler = (req, res) => {
    const url = new URL(req?.url || "/", "http://localhost");
    const searchParams = new URLSearchParams(url?.searchParams);
    const id = searchParams.get("id") as string;
    const item = context.get(id);
    res?.writeHead(200, { "Content-Type": "application/json" });
    res?.write(JSON.stringify(item));
    res?.end();
};

// [POST]
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

```

You should use the native request and response functionality from the `node:http` package. 

For handling the data you could make use of the [context tools](./context/ctx.ts)

---

### Logs 
<img src="./assets/Screenshot 2024-02-04 155636.png" width="600px" alt="logs">

- Writes logs at context at every request
- Could write logs into a file
