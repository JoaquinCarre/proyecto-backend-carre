import { Router } from 'express';
import params from '../db-config/minimistConfig.js';
import path from 'path';
import os from "os";
import compression from 'compression';
import { logger } from "../logs/logger.js";

const router = Router();

router.get('/info', compression(), function (req, res, next) {
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
        console.log(data);
        res.status(200).json(data);
    }
    catch (err) {
        logger.error(`${err.message}`);
        next(err);
    }
});

//ruta info sin compresión
router.get('/info-nc', function (req, res, next) {
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
        /* console.log(data); */
        res.status(200).json(data);
    }
    catch (err) {
        logger.error(`${err.message}`);
        next(err);
    }
});

export default router;