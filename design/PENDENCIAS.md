# Pendências de design

Este arquivo contém apenas decisões **ainda abertas**. Princípios já aprovados foram movidos para `design/PRINCIPIOS.md`.

## 1. Margem de sucesso no combate

A tabela geral de margem continua valendo, mas ainda falta definir um efeito mecânico padronizado para ataques com margem alta.

Direção aprovada para estudo:
- margem 0: dano + custo;
- margem 1–4: dano normal;
- margem 5+: dano + um efeito fixo e imediatamente resolvido.

Ainda falta encontrar um efeito para 5+ que seja relevante sem acelerar demais a degradação de Atributos. **Não aplicar ainda.**

## 2. Descanso como gerenciamento de recurso e roleplay

Explorar um pequeno menu de ações de descanso, sem criar um minijogo separado.

Hipótese atual: durante um descanso, escolher duas ações entre opções como Recuperar, Reparar, Preparar, Cuidar e Fortalecer um vínculo. Cada escolha deve pedir apenas uma descrição curta de como acontece.

Ainda falta definir:
- quantidade de ações;
- diferença entre descanso breve e longo;
- recuperação automática versus escolhida;
- quais recursos competem entre si;
- interação com Marcas e ajuda.

**Não aplicar ainda.**

## 3. Classe de vínculo / auxiliares recorrentes

Explorar uma Classe inspirada na função dos Contatos de Daggerheart, mas com justificativa ficcional mais sólida.

Direção atual: partir da fantasia de alguém ligado permanentemente a sombras, espíritos, animais fantásticos, organismos estranhos ou outras entidades recorrentes, em vez de justificar NPCs convenientes aparecendo a cada uso.

Ainda falta definir fantasia central, nome reconhecível e Marca de Classe. **Não aplicar ainda.**

## 4. Arquitetura oficial de Classes para um sistema genérico

A criação seguirá a hipótese aprovada de **1 Marca de Classe + 3 Marcas comuns**, mas ainda falta definir quais Classes o catálogo apresentará oficialmente.

Problema central: não queremos simplesmente copiar a lista de fantasia de D&D, mas também não queremos nomes tão abstratos que o leitor precise aprender uma nova taxonomia.

Referência útil para estudo: sistemas genéricos como Cypher usam poucos tipos amplos e reconhecíveis, adaptando nomes e especializações ao gênero. Precisamos encontrar nosso próprio equilíbrio entre:
- reconhecimento imediato;
- uso em fantasia, ficção científica, horror, moderno e outros cenários;
- espaço para Especializações sem criar dezenas de Classes redundantes.

Questão associada: **Marcas comuns não devem ser exclusivas de Classe por padrão.** Classe e Especialização são etiquetas de recomendação e navegação. Só estudar restrições se uma necessidade mecânica concreta aparecer.

## 5. Template de Marca de Classe

Definir a gramática antes de produzir muitas Classes.

Princípio já aceito: a Marca de Classe deve ser **mais ampla e definidora**, não simplesmente mais poderosa numericamente. Ela estabelece a fantasia central sem substituir Marcas de grande impacto.

Protótipos iniciais para comparar:
- Guerreiro;
- Mago;
- Ladino;
- Clérigo.

Questões abertas:
- quão ampla pode ser a permissão;
- equilíbrio de amplitude entre marcial e mágico;
- qual parte do kit básico pertence à Marca de Classe;
- quando pode existir modificador numérico;
- se precisa de Custo;
- como reflavorizar entre gêneros mantendo reconhecimento.

A ideia de Prestidigitação deve ser testada aqui: pequenas manifestações arcanas podem fazer parte da Marca de Classe do Mago, enquanto efeitos importantes continuam em Marcas próprias.

## 6. Apresentação didática dos modificadores

O limite global de vantagem numérica permanece em **3**, com Escalar aplicado depois.

Também permanece a lógica interna de separar fontes de modificador para impedir contagem dupla, mas ainda falta encontrar uma forma de ensinar isso sem apresentar “famílias” como um novo subsistema ou termo que o jogador precise decorar.

Objetivo: o leitor deve entender de onde vêm os modificadores, como efeitos semelhantes se combinam e quando parar de contabilizar fatores, sem transformar a rolagem em contabilidade.

## 7. Playtest do limite global de 3

Manter ±3 como hipótese principal até evidência contrária.

Medir em jogo:
- frequência de +2/+3 e -2/-3;
- interação entre Cena, Marcas, Ajuda e Defender;
- tempo gasto discutindo modificadores;
- impacto sobre margens altas;
- efeito de Escalar depois do limite.

## 8. Revisão de consistência do baralho

A arquitetura das cartas já é suficientemente padronizada; esta pendência é editorial, não um novo sistema.

Revisar por função internamente (especialização, defesa, dano, permissão, reação, recurso, proteção e controle), sem expor essa gramática ao leitor.

Prioridades atuais:
- Escudo Confiável;
- Barreira Instantânea;
- Duelista;
- Guarda Veterano e referências a Defesa Ativa/Passiva;
- cartas que ainda dependem da antiga regra de Ataque Surpresa;
- efeitos de +1/-1 incompatíveis com a nova apresentação de modificadores.

## 9. Chefes: exemplos e balanceamento

A decisão estrutural está fechada: chefes resolvem economia de ações por suas próprias Marcas, não por um subsistema universal.

Ainda falta produzir e testar modelos de Marcas para:
- ações/respostas adicionais;
- Reações extras;
- transformação de fase;
- controle de campo;
- respostas ao sofrer dano.

O livro deve ensinar que o Mestre pode criar seus próprios chefes seguindo essa lógica; as cartas prontas são suporte, não obrigação.

## 10. UX de Classe e Especialização no compêndio

Aplicar na página de cartas, não como regra do sistema.

Fluxo desejado:
1. escolher uma fantasia/Classe;
2. escolher uma Especialização como filtro opcional;
3. receber poucas Marcas recomendadas;
4. escolher três;
5. poder abrir todo o catálogo ou criar/adaptar cartas livremente.

Priorizar navegação por fantasia (ex.: Mago → Ilusão) antes de filtros mecânicos (Defesa, Utilidade, Ofensiva).

Ainda falta implementar a estrutura de dados e interface correspondente.
