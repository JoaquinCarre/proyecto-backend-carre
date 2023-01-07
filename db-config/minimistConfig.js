//Agregado para el desafío 14
import minimist from "minimist";

const options = { default: { p: 8080, m: 'fork' }, alias: { p: 'PORT', m: 'MODE' } };

const params = minimist(process.argv.slice(2), options);

export default params;