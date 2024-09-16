const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // Se utiliza 'req' para evitar el error de declaración no utilizada
    console.log(req); // Agregar esta línea para usar 'req'
    res.send('Hello World from express');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});