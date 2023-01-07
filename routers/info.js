import { Router } from 'express';
import params from '../db-config/minimistConfig.js';
import path from 'path';
import os from "os";

const router = Router();

router.get('/info', function (req, res, next) {
    try {
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
        console.log(err.message);
        next(err);
    }
});

export default router;