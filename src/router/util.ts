import {Context} from "../context";
import { type Method, type RouteListItem, type LogLine } from "./types";
import { IncomingMessage, ServerResponse } from "http";
import fs from "fs";


const context = new Context();

// add route to context
const addRouteToContext = (
    method: Method,
    path: string,
    description: string
) => {
    context.add({
        type: "route",
        method,
        path,
        description,
    });
};

// list routes from context
const listRoutesFromContext = () => {
    const routes = context.getByProperty("type", "route") as RouteListItem[];
    return routes?.map(({ method, path, description }) => ({
        method,
        path,
        description,
    }));
};

// add log to context
const addLogToContext = (logLine: string) => {
    context.add({
        type: "log",
        text: logLine,
        created: Date.now(),
    } as LogLine);
};

// write logs to file
const writeLogsToFile = (fileName: string) => {
    const logs = context
        .getByProperty("type", "log")
        .map((log: LogLine) => log.text)
        .join("\n");
    fs.writeFileSync(fileName, logs);
};

// calculate max length in characters from column
const maxTdLengthFromColumn = (data: Array<any>) => {
    return data.reduce((acc, item) => {
        return {
            method: Math.max(acc.method || 0, item.method.length),
            path: Math.max(acc.path || 0, item.path.length),
            description: Math.max(
                acc.description || 0,
                item.description.length
            ),
        };
    });
};

// write line
const writeLine = (line: string[]) => {
    return `| ${line
        .map((header) => "-".repeat(header.length))
        .join(" | ")} |\n`;
};

// list routes as console table
const listRoutesAsConsoleTable = () => {
    const routes = listRoutesFromContext();
    let headerNames = ["Method", "Path", "Description"];
    const headerValues = maxTdLengthFromColumn(routes);
    const headersWithSpaces = headerNames.map((header) =>
        header.padEnd(headerValues[header.toLowerCase()] + 2, " ")
    );
    const { method, path, description } = headerValues;
    let table = writeLine(headersWithSpaces);
    table += `| ${headersWithSpaces.join(" | ")} |\n`;
    table += writeLine(headersWithSpaces);
    routes.forEach((route) => {
        table += `| ${route.method.padEnd(
            method + 2,
            " "
        )} | ${route.path.padEnd(path + 2, " ")} | ${route.description.padEnd(
            description + 2,
            " "
        )} |\n`;
    });
    table += writeLine(headersWithSpaces);
    console.log(table);
};

// welcome screen at console
const welcomeConsole = () => {
    const AppName = " ⚡🌶️ Pepper Router 🌶️⚡ ";
    console.log("\n", "\x1b[36m%s\x1b[0m", AppName, "\n");
    console.log(" \n Welcome to the Api Server! \n");
    console.log(" \n Available routes: \n");
    listRoutesAsConsoleTable();
    console.log(" \n Good luck! \n");
};

// simple logger at console
const simpleLogger = (req: IncomingMessage, res: ServerResponse) => {
    const logLine = `${new Date()} - [${req.method}] "${req.url}" - ${
        res.statusCode
    } - ${res.statusMessage}`;

    addLogToContext(logLine);

    console.log(logLine);
};

export {
    context,
    addRouteToContext,
    listRoutesFromContext,
    welcomeConsole,
    simpleLogger,
    writeLogsToFile,
};
