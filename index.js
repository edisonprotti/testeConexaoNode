const http = require('http');
const db = require('./conexao');

const PORT = process.env.PORT || 3000;

// Prepara a estrutura do banco relacional na inicialização
async function prepararBancoDeDados() {
    try {
        // Cria a tabela caso o container tenha subido do zero
        await db.query(`
            CREATE TABLE IF NOT EXISTS \`agenda\` (
              \`id\` int(11) NOT NULL AUTO_INCREMENT,
              \`nome\` varchar(50) NOT NULL,
              \`email\` varchar(100) NOT NULL,
              \`telefone\` varchar(20) DEFAULT NULL,
              PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);
        console.log("✅ Tabela 'agenda' verificada.");

        // Verifica se precisa de dados de teste
        const [rows] = await db.query('SELECT COUNT(*) as total FROM agenda');
        if (rows[0].total === 0) {
            await db.query(`
                INSERT INTO \`agenda\` (\`id\`, \`nome\`, \`email\`, \`telefone\`) VALUES
                (1, 'Edison Protti', 'edison@edison', '988989898'),
                (2, 'bete', 'bete@bete', '424234234'),
                (5, 'pedro1', 'pedro@pedro1', '42423');
            `);
            console.log("🔹 Registros de teste inseridos.");
        }
    } catch (error) {
        console.error("⚠️ Erro na carga inicial do SQL:", error.message);
    }
}

const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (req.url === '/' || req.url === '/agenda') {
        try {
            const [linhas] = await db.query('SELECT * FROM agenda');
            res.statusCode = 200;
            res.end(JSON.stringify({
                sucesso: true,
                arquitetura: "Instância Única Isolada (Node + MySQL Embutido)",
                dados: linhas
            }, null, 2));
        } catch (erro) {
            res.statusCode = 500;
            res.end(JSON.stringify({
                sucesso: false,
                erro: "Erro ao consultar o banco local da instância.",
                detalhe: erro.message
            }, null, 2));
        }
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Rota não encontrada" }));
    }
});

// Garante a execução da carga de dados antes de abrir a porta web
prepararBancoDeDados().then(() => {
    server.listen(PORT, () => {
        console.log(`🚀 Aplicação unificada rodando perfeitamente na porta ${PORT}`);
    });
});
