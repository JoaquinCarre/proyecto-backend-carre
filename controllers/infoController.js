import params from '../config/minimistConfig.js';
import path from 'path';
import os from "os";
import { logger } from '../logs/logger.js';

export async function infoCompressed(req, res, next) {
    try {
        logger.info(`Acceso a ruta ${req.originalUrl} con el metodo ${req.method}`)
        const data = {
            arguments: params,
            executionPath: process.cwd(),
            platformName: process.platform,
            processID: process.pid,
            nodeVersion: process.version,
            projectFolder: path.basename(process.cwd()),
            totalReservedMemory: process.memoryUsage().rss,
            totalCPUs: os.cpus().length
        }
        res.status(200).json(data);
    }
    catch (err) {
        logger.error(`${err.message}`);
        next(err);
    }
}

export async function infoNonCompressed(req, res, next) {
    try {
        logger.info(`Acceso a ruta ${req.originalUrl} con el método ${req.method}`)
        const data = {
            arguments: params,
            executionPath: process.cwd(),
            platformName: process.platform,
            processID: process.pid,
            nodeVersion: process.version,
            projectFolder: path.basename(process.cwd()),
            totalReservedMemory: process.memoryUsage().rss,
            totalCPUs: os.cpus().length
        }
        res.status(200).json(data);
    }
    catch (err) {
        logger.error(`${err.message}`);
        next(err);
    }
}