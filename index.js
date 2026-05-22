const http = require('http');
const db = require('./conexao');

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
    // Configura a resposta para aceitar caracteres especiais e formato JSON
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (req.url === '/' || req.url === '/agenda') {
        try {
            // Executa a consulta na tabela que criámos na aula anterior
            const [linhas] = await db.query('SELECT * FROM agenda');
            
            res.statusCode = 200;
            res.end(JSON.stringify({
                sucesso: true,
                mensagem: "Conectado ao MySQL com Node.js com sucesso!",
                dados: linhas
            }, null, 2));

        } catch (erro) {
            res.statusCode = 500;
            res.end(JSON.stringify({
                sucesso: false,
                erro: "Falha ao consultar o banco de dados interno.",
                detalhe: erro, // Mudamos de erro.message para erro (traz o objeto completo)
                codigo_erro: erro.code || "Sem código"
            }, null, 2));
        }
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ erro: "Página não encontrada" }));
    }
});

server.listen(PORT, () => {
    console.log(`Servidor Node.js rodando na porta ${PORT}`);
});
