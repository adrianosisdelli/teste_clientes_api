const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); 

const app = express();
const port = 3000;

app.use(cors()); 

const conexao = new Pool({
  user: 'adriano',
  host: '172.17.0.2',
  database: 'postgres',
  password: 'adr1234',
  port: 5432,
});


app.get('/clientes', async (req, res) => {
  try {
    const result = await conexao.query('SELECT id, nome, telefone, email, endereco, x, y FROM _cliente');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});


app.use(express.json());
app.post('/clientes', async (req, res) => {
  try {
    const { nome, telefone, email, endereco, x, y } = req.body;
    await conexao.query(
      'INSERT INTO _cliente (nome, telefone, email, endereco, x, y) VALUES ($1, $2, $3, $4, $5, $6)',
      [nome, telefone, email, endereco, x, y ]
    );
    res.status(201).json({ message: 'Cliente inserido com sucesso!' });
  } catch (error) {
    console.error('Erro ao inserir cliente:', error);
    res.status(500).json({ error: 'Erro ao inserir cliente' });
  }
});


app.delete('/clientes/:id', async (req, res) => {
    try {
        const clienteId = req.params.id;

        await conexao.query('DELETE FROM _cliente WHERE id = $1', [clienteId]);
        res.status(200).json({ message: "Cliente excuído com sucesso!" })
    }
    catch (error) {
        console.error('Erro ao inserir cliente:', error);
        res.status(500).json({ error: 'Erro ao inserir cliente' });
    }

});


app.get('/rota_ordenada', async(req, res) => {

  const calculaRota = (clientes) => {

    const pontoInicial = { x: 0, y: 0 }

    function calcularDistancia(ponto1, ponto2) {
      
      return Math.sqrt((ponto1.x - ponto2.x) ** 2 + (ponto1.y - ponto2.y) ** 2);
    }

    const distancias = clientes.map((cliente) => ({
      cliente,
      distancia: calcularDistancia(cliente, pontoInicial),
    }));

    const clientesOrdenados = distancias.sort((a, b) => a.distancia - b.distancia);

    return clientesOrdenados;
  }

  try {
    const result = await conexao.query('SELECT id, nome, telefone, email, endereco, x, y FROM _cliente');
    res.json(calculaRota(result.rows));
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});


app.listen(port, () => {
  console.log(`A api está em funcionamento na porta ${port}`);
});