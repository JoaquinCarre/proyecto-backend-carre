//Agregado para el desafío 14:
const randomNumbers = [];

process.on("message", query => {
    Randomize(query);
    process.send(randomNumbers);
    process.exit();
});

function Randomize(cant) {
    let number;
    for (let i = 0; i < cant; i++) {
        number = Math.floor((Math.random() * 1000) + 1);
        randomNumbers.push({ [i+1] : number })
    }
}

process.send('listo');