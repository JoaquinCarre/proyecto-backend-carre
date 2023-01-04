//Agregado para el desafío 14:
import { Router } from 'express';
import { fork } from 'child_process';

const router = Router();

router.get('/randoms', function (req, res, next) {
  try {
    const cant = req.query.cant;
    let quantity;
    if (cant) {
      console.log(`Generando ${cant} números aleatorios`);
      quantity = cant
    } else {
      console.log(`Generando 100000000 números aleatorios`);
      quantity = 100000000;
    }
    const forked = fork('./api/randomize.js');
    forked.on('message', msg => {
      if (msg === 'listo') {
        forked.send(quantity);
        return;
      }
      res.end(JSON.stringify(msg, null, 2));
    })
  }
  catch (err) {
    console.log(err.message);
    next(err);
  }
});

export default router;