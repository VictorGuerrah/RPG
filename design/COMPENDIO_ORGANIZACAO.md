# Organização do Compêndio

Este documento define como o material do jogo cresce sem transformar os baralhos em uma coleção difícil de consultar. Ele organiza conteúdo para dois usos diferentes: criar material novo e preparar uma sessão com rapidez.

O compêndio não substitui o livro de regras. Ele reúne opções prontas que usam as regras de `../regras/sistema.md`.

## Estrutura futura

O material pode crescer em quatro coleções independentes:

| Coleção | Conteúdo | Arquivo atual |
| --- | --- | --- |
| Marcas | origens, treinamentos, equipamentos, poderes, vínculos e instintos | `../baralhos/baralho-marcas-v1.md` |
| Adversários | ameaças prontas, papéis e encontros | `../baralhos/baralho-monstros-v1.md` |
| Cenários | locais, facções, perigos, ganchos e tesouros | `../cenarios/` |
| Aventuras | sessões prontas e ferramentas específicas de cada aventura | `../aventuras/Caldeira Torta.md` |

Quando uma coleção ficar grande, divida-a em arquivos por família ou tema. O arquivo principal da coleção passa a ser apenas um índice e guia de uso.

## Marcas: famílias e etiquetas

As famílias dizem **que tipo de coisa a Marca é**. As etiquetas dizem **em que tipo de aventura ela aparece bem**. Uma carta pode ter uma família e várias etiquetas.

| Família | Uso |
| --- | --- |
| Origem | ancestralidade, constituição ou natureza incomum |
| Treinamento | técnica, profissão, conhecimento ou ofício |
| Equipamento | arma, proteção, ferramenta ou item especial |
| Poder | magia, mutação, tecnologia ou capacidade impossível |
| Vínculo | contato, reputação, obrigação ou companheiro |
| Instinto | hábito, reação ou traço pessoal |

Use as seguintes etiquetas de cenário:

| Etiqueta | Pergunta que responde |
| --- | --- |
| Conflito | ajuda em combate, perseguição ou defesa? |
| Exploração | ajuda a atravessar, sobreviver ou descobrir um local? |
| Investigação | ajuda a encontrar, interpretar ou confirmar informações? |
| Social | ajuda a negociar, influenciar ou obter acesso? |
| Furtividade | ajuda a se esconder, infiltrar ou escapar? |
| Sobrenatural | depende de magia, estranheza ou fenômeno impossível? |
| Tecnologia | depende de máquinas, ciência ou engenharia? |
| Sobrevivência | ajuda com ambiente hostil, viagem ou recursos? |

Exemplo de índice: **Mãos de Fogo** é um Poder com as etiquetas Conflito e Sobrenatural. **Kit de Disfarces** é um Equipamento com as etiquetas Social e Furtividade.

Não crie uma nova família para cada ideia. Use família para o formato da carta e etiquetas para a consulta.

## Adversários: papéis, temas e locais

O papel diz **o que o adversário faz no encontro**. O tema e a localidade dizem **onde ele pertence na aventura**.

### Papéis

Mantenha os papéis já usados no Baralho de Monstros:

- Capanga
- Comum
- Especialista
- Brutamontes
- Suporte ou Líder
- Solo

### Temas

Use um tema para agrupar adversários que compartilham estética, origem ou modo de agir:

| Tema | Exemplos |
| --- | --- |
| Povos das ruínas | goblins, orcs, mercenários, saqueadores |
| Mortos inquietos | esqueletos, zumbis, sombras, necromantes |
| Feras e caçadores | lobos, aranhas, basiliscos, predadores |
| Aberrações e horrores | mímicos, cubos, hidras, criaturas estranhas |
| Construtos e máquinas | armaduras animadas, sentinelas, golems |
| Natureza hostil | esporos, dríades, elementais, plantas carnívoras |
| Cultos e ocultismo | cultistas, feiticeiros, invocações, monstros ligados a rituais |
| Nobreza e crime | guardas, duelistas, capangas, chefes do submundo |

### Localidades

A localidade permite montar encontros imediatamente:

- masmorra e ruína;
- floresta e ermo;
- cidade e submundo;
- estrada e fronteira;
- templo, cripta ou cemitério;
- laboratório, oficina ou instalação;
- costa, navio ou profundezas;
- outro mundo ou região sobrenatural.

Exemplo: para uma cripta, filtre por **Mortos inquietos** e **templo, cripta ou cemitério**; depois escolha um papel para cada função do encontro.

## Modelo de carta

Toda carta nova deve ser fácil de localizar e usar. Coloque esta ficha antes do texto da carta enquanto ela ainda estiver em teste:

```md
**Família ou Papel:** ...
**Etiquetas:** ...
**Ambiente:** ...
**Função:** ...
**Estado:** rascunho, em teste ou aprovado
```

Em Marcas, a função é Especialização, Permissão, Proteção, Apoio ou Recurso.

Em adversários, a função é o Papel. O Ambiente é uma ou mais Localidades. Marcas não precisam de Ambiente se funcionarem em qualquer cenário.

Quando a carta estiver aprovada, as etiquetas podem ficar no índice em vez de aparecer na frente da carta. A carta de mesa deve continuar limpa.

## Como adicionar conteúdo

1. Escolha a coleção: Marca, Adversário, Cenário ou Aventura.
2. Defina a família ou o papel.
3. Dê de duas a quatro etiquetas que facilitem encontrá-la.
4. Escreva a carta usando apenas regras que já existam.
5. Compare-a com duas cartas próximas em potência.
6. Marque como **rascunho** e registre o que precisa ser testado.
7. Depois de usada em mesa, anote um ajuste curto e altere o estado para **em teste** ou **aprovado**.

Uma carta deve entrar no compêndio porque abre escolhas novas, não apenas porque tem um nome diferente.

## Índices de consulta

Cada coleção grande deve começar com dois índices:

### Índice de criação

Organiza as cartas por família, papel e etiquetas. Serve para escrever material novo, conferir lacunas e evitar repetir a mesma função.

### Índice de mesa

Organiza as cartas por uma pergunta prática:

- “Quais Marcas combinam com uma aventura urbana?”
- “Que inimigos cabem numa floresta?”
- “Preciso de um adversário de suporte para uma luta com mortos-vivos.”
- “Quais opções ajudam uma sessão de investigação?”

O índice de mesa pode ser uma tabela curta que aponta para os nomes das cartas. Não copie o texto completo da carta.

## Ordem de expansão recomendada

1. Revisar e testar o núcleo atual de Marcas e Adversários.
2. Criar pequenos pacotes de cenário, começando por **Ruínas e masmorras**, **Cidade e submundo** e **Floresta e ermo**.
3. Para cada pacote, adicionar Marcas, adversários, locais, perigos e um gancho de aventura.
4. Criar um índice geral quando houver cartas suficientes para que a busca manual fique lenta.
5. Só então criar novas famílias, subsistemas ou formatos de carta.

Essa ordem mantém o compêndio útil desde cedo: cada pacote já dá ao Mestre um lugar, uma ameaça, opções de personagem e uma sessão possível.

## Controle de qualidade

Antes de aprovar uma carta ou pacote, confira:

1. Ela usa termos que o sistema já explica?
2. Ela cria uma decisão em jogo?
3. Ela é diferente de uma carta existente em função, e não só em aparência?
4. Ela cabe em uma one-shot ou campanha curta?
5. Ela pode ser encontrada por família, tema ou localidade?
6. Ela continua simples quando lida fora do contexto em que foi criada?

