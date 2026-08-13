# RPG

Repositório principal do projeto de RPG e do Card Collection.

## Arquitetura

O projeto separa **código**, **conteúdo vivo** e **backlog de design** para evitar cópias concorrentes.

### Código — GitHub

- `card-collection/` — frontend estático do compêndio (`index.html`, `app.js`, `light.css` e fallback mínimo `data.js`).
- `.github/workflows/sync-supabase-content.yml` — sincroniza automaticamente snapshots do conteúdo do Supabase para este repositório.

### Conteúdo vivo — Supabase

- `public.compendium_cards` — fonte canônica das cartas.
- `public.system_rules` — fonte canônica do texto de regras exibido pelo compêndio.
- Edge Function `card-collection-admin` — operações protegidas de criação, edição e exclusão de cartas.

### Backlog de design — GitHub

- `design/PENDENCIAS.md` — decisões ainda abertas e ainda não incorporadas ao texto publicado.

### Snapshots — GitHub

A pasta `snapshots/` é gerada automaticamente pelo GitHub Actions e serve como cópia versionada do conteúdo vivo:

- `snapshots/system_rules.md`
- `snapshots/compendium_cards.json`

Esses arquivos **não devem ser editados manualmente**. Alterações de conteúdo devem ser feitas no Supabase; o workflow atualiza os snapshots.

## Fluxo entre dispositivos

1. Faça `git pull` antes de começar a trabalhar em código ou arquivos locais.
2. Alterações de código e do backlog de design são feitas e versionadas neste repositório.
3. Alterações de cartas e do texto publicado são feitas na fonte canônica do Supabase.
4. O workflow `Sync Supabase content` cria snapshots a cada 6 horas e também pode ser executado manualmente.
5. Faça `git push` das alterações locais antes de continuar em outro dispositivo.

## Regra de fonte única

Não mantenha cópias independentes das cartas ou das regras dentro de `card-collection/`.

- O frontend lê cartas de `compendium_cards`.
- O frontend lê regras de `system_rules`.
- O GitHub guarda snapshots para histórico, backup e sincronização entre dispositivos.
- Decisões ainda abertas ficam em `design/PENDENCIAS.md`.

O antigo `data.js` completo era uma cópia redundante das cartas. Ele permanece apenas como fallback mínimo.
