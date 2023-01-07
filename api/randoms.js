//Agregado para el desafío 14:
import { Router } from 'express';
import { fork } from 'child_process';
import params from '../db-config/minimistConfig.js';

const { PORT, MODE } = params;

const router = Router();

router.get('/randoms', function (req, res, next) {
  try {
    const cant = req.query.cant;
    let quantity;
    if (cant) {
      if (isNaN(Number(cant))) {
        res.send("<h1>Debe ingresar un número para cant</h1>")
        return
      } else {
        console.log(`Generando ${cant} números aleatorios`);
        quantity = cant;
      }
    } else {
      console.log(`Generando 20 números aleatorios`);
      quantity = 20;
    }
    const forked = fork('./api/randomize.js');
    forked.on('message', msg => {
      if (msg === 'listo') {
        forked.send(quantity);
        return;
      }
      msg.push({text: `Servidor corriendo en puerto ${PORT} y en modo ${MODE}`})
      res.end(JSON.stringify(msg, null, 2));
    })
  }
  catch (err) {
    console.log(err.message);
    next(err);
  }
});

export default router;