const express = require('express');
const app = express();
const port = 3000;


app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});


app.get('/converter', (req, res) => {
    
    const reais = parseFloat(req.query.valorReais);
    const taxaCmbio = 5.00; 

    if (isNaN(reais)) {
        return res.send("Por favor, insira um valor numérico válido.");
    }

    const dolares = reais / taxaCmbio;

    
    res.send(`
        <h2>Resultado da Conversão</h2>
        <p>Valor original: R$ ${reais.toFixed(2)}</p>
        <p><strong>Valor convertido: U$ ${dolares.toFixed(2)}</strong></p>
        <a href="/">Voltar</a>
    `);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});