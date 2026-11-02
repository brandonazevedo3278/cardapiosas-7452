# Cardápio Online
Plano aprovado: web responsiva SaaS multiempresa; autenticação email/senha e admin privado; banco persistente; CRUD e isolamento; pedidos calculados no servidor; cobrança manual; galerias/GLB; documentação e testes.

## Progresso
- [x] Referência, nome e plano aprovados
- [x] Stack provisionada e senha admin recebida via formulário seguro
- [x] Direção de design registrada
- [x] Schema, auth, bootstrap admin/planos/demo
- [x] APIs de empresas, catálogo, pedidos, assinaturas e uploads
- [x] Landing, login, cardápio e painéis
- [x] Testes de integração e navegador: 1 suíte, 57 verificações, desktop/mobile, upload real e primeira troca de senha
- [x] Lint sem erros e build com typecheck efetivo dos dois projetos TypeScript
- [x] README de operação, arquitetura, limitações e testes
- [x] Entrega do preview web

## Decisões
- Cobrança manual. Nenhum pagamento de cliente é marcado aprovado.
- Recuperação por token privado gerado por administrador após verificação externa; e-mail automático não configurado.
- Fotos e modelos em Tigris; seed demonstrativo claramente separado.
- Sem métricas comerciais fictícias.

## Verificações em 30/10/2026
- Fluxos de login, cadastro/setup, primeiro acesso, catálogo, checkout, acompanhamento, QR e painéis exercitados no navegador.
- Isolamento entre empresas, bloqueios de plano/assinatura, preços, estoque/cancelamento e recuperação de uso único exercitados na API real.
- Upload direto Tigris e publicação da fotografia exercitados também no navegador; fixtures são limpas ao final.
- Token de sessão renovado corretamente após troca de senha. A senha real do proprietário não foi alterada.
- Rotas e visualizador 3D carregados sob demanda. Vite ainda avisa sobre tamanho de chunks, sem impedir o build.
- Cobrança recorrente, e-mail automático e AR em aparelho físico não fazem parte da validação entregue.
- Correção posterior: a origem HTTPS real da prévia E2B não estava autorizada. Origem adicionada explicitamente; URL oficial normalizada sem barra final. RUNABLE_URL não é uma origem de login e foi removida da lista.
- Suíte completa repetida no endereço externo da prévia: 57 verificações aprovadas, incluindo login do proprietário, login do empresário, troca de senha e upload pelo navegador.
- Marca Made with Runable removida a pedido; analytics preservado.

## Correção de acesso após mudança do ambiente
- Site e API estavam respondendo, mas Better Auth rejeitava a origem do novo sandbox.
- Removido hostname E2B antigo fixo. Origem agora deriva do E2B_SANDBOX_ID atual e da porta protegida do template; origem oficial e proteção contra origens externas preservadas.
- Leitura de __ports.cjs via createRequire compatível com Vite SSR e Bun. Servidor reiniciado na mesma porta para recarregar variáveis do ambiente.
- Validação: 3 testes aprovados, 62 verificações; navegador desktop/mobile com login, catálogo, pedidos, upload, QR e administração temporária. Senha real do proprietário não alterada; login real não retestado porque já não depende da senha inicial.
- Lint e build aprovados; aviso não bloqueante de chunks grandes permanece.
- Prévia oficial /dono carregada no Chrome sem erros JavaScript; /api/health oficial responde 200.
- Pendente: usuário especificar as próximas funcionalidades; publicação/monitoramento/teste de carga não realizados.
## Migração para novo ambiente Runable (01/11/2026)
- Projeto importado do zip. `.env` antigo apontava para SQLite local (`file:local.db`) e não tinha credenciais Tigris; substituído pelo `.env` provisionado (Turso + Tigris + auth). `BRANDON_ADMIN_PASSWORD` mantida.
- `vite/__plugins/hono-dev-plugin.ts` (protegido) estava modificado; restaurado para a versão oficial do template.
- Schema aplicado no Turso novo; bootstrap recriou proprietário, planos e loja demo.
- Testes corrigidos (expectativas de origens desatualizadas; checagem de 3D quebrado agora em página nova por causa do cache do model-viewer). Suíte: 3/3 aprovados.
- Visual inalterado.
