Este repositório é referente ao serviço de api para criação e consulta de clientes.

1. Necessário haver um banco de dados postgres. O script para a criação da tabela única que é usado neste se encontra na raiz do repositório, com o nome de "criadb.sql";
2. Os parâmetros de configuração para acesso ao banco de dados estão no próprio arquivo (para simplificiar a demonstração), a partir da linha de código 10 do arquivo "server.j":
   const conexao = new Pool({
  user: 'adriano',
  host: '172.17.0.2',
  database: 'postgres',
  password: 'adr1234',
  port: 5432,

});

3. Com o Node js devidaente instalado, navegar até o diretório onde este foi clonado e entrar com o comando node server.js.
   
