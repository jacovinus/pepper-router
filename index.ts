import { type Server } from "node:http";
import routes from "./router/routes";

routes.init(routes.server as Server, 3000, (req, res) => {
    console.log(`${new Date()} - [${req.method}] "${req.url}"`);
});
