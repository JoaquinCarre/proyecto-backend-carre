import { React, ReactDOMServer } from '../../deps.ts';
import { get } from '../db/index.ts';

const colors = get();

export default () => `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Desafío 24 - Deno</title>
</head>
${
  ReactDOMServer.renderToString(
    <body style={{ backgroundColor: 'black' }}>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ color: 'white' }}>Color Show</h1>
        <form method="post">
          <label htmlFor="color" style={{ color: 'white' }}>Enter a color: </label>
          <input type="text" id="color" name="color" />
          <button type="submit">Agregar</button>
        </form>
        <ul>
          {colors.map((color) => (
            <li key={color} style={{ color: color }}>
              {color}
            </li>
          ))}
        </ul>
      </div>
    </body>
  )
}
</html>
`