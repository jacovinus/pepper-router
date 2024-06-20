import { type Server } from "node:http";
import routes from "./router/routes";
import { simpleLogger } from "./router/util";

routes.init(routes.server as Server, 3000, (req, res) => {
    simpleLogger(req, res);
});
// the main component