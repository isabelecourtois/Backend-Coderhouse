import winston from "winston";

export const loggers = winston.createLogger({
    level: "warn",
    transports: [
        new winston.transports.Console({ level: "info"}),
        new winston.transports.File({ filename: "./loggers/warn.log", level: "warn"})
    ]
})