# RPG

Repositório principal do projeto de RPG e do Card Collection.

## Arquitetura atual

- `card-collection/` — frontend estático do compêndio (`index.html`, `app.js`, `light.css` e um fallback mínimo `data.js`).
- Supabase `public.compendium_cards` — fonte canônica das cartas.
- Supabase `public.system_rules` — fonte canônica do texto das regras atualmente publicado.
- Supabase Edge Function `card-collection-admin` — operações protegidas de criação, edição e exclusão de cartas.

## Fluxo portátil

1. Alterações de código são feitas e versionadas neste repositório.
2. Conteúdo dinâmico compartilhado permanece no Supabase.
3. No desktop, use Git pull para receber alterações feitas remotamente e Git push antes de continuar o trabalho em outro dispositivo.

## Observação

O antigo `data.js` completo era uma cópia redundante das cartas. Neste repositório ele é apenas um fallback vazio; ao iniciar, `app.js` carrega as cartas diretamente do Supabase.
