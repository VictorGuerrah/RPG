(() => {
  const SUPABASE_URL = "https://skzrdmqyzrvzcsfwdgxw.supabase.co";
  const SUPABASE_KEY = "sb_publishable_eq2kyrozvUWslX5wtI61Mg_6EaJM122";
  const client = window.supabase?.createClient(SUPABASE_URL, SUPABASE_KEY);
  const groups = { Marca:["Origens","Treinamentos","Equipamentos","Poderes","Vínculos","Instintos"], "Adversário":["Capangas","Adversários comuns","Especialistas","Brutamontes","Suportes e líderes","Solos"] };
  const functionOrder = ["Ofensiva","Proteção","Controle","Suporte","Recuperação","Mobilidade","Exploração","Investigação","Social","Furtividade"];
  const functionAliases = {
    ataque:"Ofensiva", ofensiva:"Ofensiva", dano:"Ofensiva", ferir:"Ofensiva",
    defesa:"Proteção", defensivo:"Proteção", protecao:"Proteção", proteger:"Proteção", escudo:"Proteção",
    controle:"Controle", controlar:"Controle", prender:"Controle", atordoar:"Controle",
    suporte:"Suporte", ajudar:"Suporte", ajuda:"Suporte", aliado:"Suporte", aliados:"Suporte",
    cura:"Recuperação", curar:"Recuperação", recuperacao:"Recuperação", recuperar:"Recuperação", tratar:"Recuperação",
    mobilidade:"Mobilidade", movimento:"Mobilidade", mover:"Mobilidade", escapar:"Mobilidade",
    exploracao:"Exploração", explorar:"Exploração", sobreviver:"Exploração",
    investigacao:"Investigação", investigar:"Investigação", pistas:"Investigação", descobrir:"Investigação",
    social:"Social", conversa:"Social", diplomacia:"Social", convencer:"Social", intimidar:"Social",
    furtividade:"Furtividade", furtivo:"Furtividade", infiltracao:"Furtividade", esconder:"Furtividade"
  };
  const backup = (window.COMPEDIUM_CARDS || []).map(card => ({ ...card, functions:[], keywords:[] }));
  const state = { cards:backup, recipes:[], recipeLinks:[], type:"Todos", group:"Todos", recipe:"Todos", fns:[], query:"", party:4, difficulty:0, chosen:{}, selected:null, status:"", channel:null, view:"cards", reviews:{}, reviewFilter:"Todos", proposals:{} };
  const $ = id => document.getElementById(id);
  const key = card => card.id || `${card.type}|${card.group}|${card.title}`;
  const esc = value => String(value || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const plain = value => String(value || "").replace(/\*\*/g,"").replace(/\n+/g," ").replace(/\s+/g," ").trim();
  const format = value => esc(value).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").split(/\n\s*\n/).map(part => `<p>${part.replace(/\n/g,"<br>")}</p>`).join("");
  const norm = value => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
  const points = card => card.type !== "Adversário" ? 0 : card.group === "Capangas" ? .5 : Number((card.body.match(/\|\s*(\d+)\s*ponto/) || [,1])[1]);
  const label = value => value === .5 ? "0,5 ponto" : value === 1 ? "1 ponto" : `${value} pontos`;
  const budget = () => Math.max(1, state.party + state.difficulty);
  const total = () => state.cards.reduce((sum, card) => sum + points(card) * (state.chosen[key(card)] || 0), 0);
  const recipeByName = name => state.recipes.find(r => r.name === name);
  const linksForRecipe = name => {
    const recipe = recipeByName(name);
    return recipe ? state.recipeLinks.filter(link => link.recipe_id === recipe.id) : [];
  };
  const priorityFor = (recipeName, cardId) => linksForRecipe(recipeName).find(link => link.card_id === cardId)?.priority || 0;
  const reviewOf = card => state.reviews[key(card)] || { status:"pending", note:"" };
  const reviewLabel = status => status === "approved" ? "Aprovada" : status === "review" ? "Revisar" : "Pendente";
  const proposalOf = card => state.proposals[card.id] || null;

  function parseSearch() {
    let text = norm(state.query);
    let detectedRecipe = state.recipe !== "Todos" ? state.recipe : null;
    if (!detectedRecipe && text) {
      const match = [...state.recipes].sort((a,b)=>b.name.length-a.name.length).find(r => text.includes(norm(r.name)));
      if (match) { detectedRecipe = match.name; text = text.replace(norm(match.name), " "); }
    }
    const detectedFns = new Set(state.fns);
    if (text) {
      for (const [alias,fn] of Object.entries(functionAliases)) {
        const re = new RegExp(`(^|\\s)${alias}(?=\\s|$)`, "g");
        if (re.test(text)) {
          detectedFns.add(fn);
          text = text.replace(re, " ");
        }
      }
    }
    const terms = text.split(/\s+/).filter(Boolean);
    return { recipe:detectedRecipe, fns:[...detectedFns], terms };
  }

  function shell() {
    document.body.innerHTML = `<div class="layout"><aside><p class="ey">FERRAMENTA DE MESA</p><h1>Compêndio</h1><p class="side-copy">Encontre cartas por fantasia, função ou texto livre.</p><input id="q" placeholder="Ex.: Paladino defesa, cura, furtividade"><p class="ey">EXIBIR</p><div id="types"></div><p class="ey">FAMÍLIA OU PAPEL</p><div id="groups"></div><div id="mark-tools"><p class="ey">RECEITA</p><select id="recipe"></select><p class="ey">FUNÇÃO</p><div id="functions" class="facet-buttons"></div><p class="ey">REVISÃO LOCAL</p><select id="review-filter"><option value="Todos">Todas as Marcas</option><option value="pending">Pendentes</option><option value="review">Precisam de revisão</option><option value="approved">Aprovadas</option></select></div><div id="monster-tools"><p class="ey">MONTAR ENCONTRO</p><select id="party">${[2,3,4,5,6].map(size => `<option ${size===state.party?"selected":""} value="${size}">${size} jogadores</option>`).join("")}</select><select id="difficulty"><option value="-1">Rápido</option><option value="0">Padrão</option><option value="1">Difícil</option><option value="2">Decisivo</option></select><p id="budget"></p></div><p class="shared" id="sync-status"></p><button id="rules">Regras do sistema</button><button id="new-card">Adicionar carta</button><button id="clear">Limpar filtros</button></aside><main><header><div><p class="ey">CARD COLLECTION</p><h2 id="heading"></h2><p id="sub"></p></div><b id="count"></b></header><div id="recipe-summary"></div><div class="work"><section id="cards"></section><section id="detail"></section></div></main></div>`;
    document.head.insertAdjacentHTML("beforeend", `<style>
      body{margin:0;background:#f4f0e8;color:#172a2e;font-family:Georgia}.layout{min-height:100vh;display:grid;grid-template-columns:290px 1fr}aside{background:#112f35;color:#fff;padding:24px 18px;display:flex;flex-direction:column;gap:12px}.side-copy{margin:0 0 10px;color:#c7d6d5;font-size:14px;line-height:1.4}h1{margin:0;font-size:28px}h2{margin:0;font-size:30px}.ey{margin:4px 0;color:#e3b778;font:700 10px Arial;letter-spacing:1px}input,select{width:100%;box-sizing:border-box;padding:9px;border:1px solid #557278;border-radius:4px;background:#0b2429;color:#fff}select{margin-bottom:7px}button{cursor:pointer}aside button:not(#clear){border:1px solid #557278;border-radius:4px;padding:7px;background:transparent;color:#dbe7e5;text-align:left;margin:2px;font:12px Arial}aside button.active,.facet-buttons button.active{background:#20454b;border-color:#e3b778;color:white}.facet-buttons{display:flex;flex-wrap:wrap;gap:4px}#clear{margin-top:auto;border:0;background:none;color:#e3b778;text-align:left;padding:4px}main{padding:30px 4vw}header{display:flex;justify-content:space-between;align-items:end;border-bottom:1px solid #d4cec1;padding-bottom:18px;margin-bottom:16px}header p{color:#647077;margin:7px 0 0}header b{color:#bd5a25;font:700 13px Arial}.recipe-summary{background:#fffdf8;border:1px solid #d4cec1;border-radius:6px;padding:14px 18px;margin:0 0 18px}.recipe-summary b{display:block;margin-bottom:5px}.recipe-summary p{margin:0;color:#647077;line-height:1.45}.work{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:24px}#cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:11px}.card{min-height:150px;border:0;border-radius:6px;padding:16px;background:#112f35;color:#fff;text-align:left}.card.selected{outline:3px solid #bd5a25}.card.core{box-shadow:inset 0 0 0 2px #e3b778}.card small{color:#e3b778;font:700 10px Arial;letter-spacing:.7px}.card h3{margin:9px 0;font-size:19px}.card p{margin:0;color:#d7e4e1;font-size:13px;line-height:1.35}.chips{display:flex;flex-wrap:wrap;gap:5px;margin-top:12px}.chip{font:700 9px Arial;letter-spacing:.4px;padding:3px 5px;border-radius:10px;background:#20454b;color:#dbe7e5}#detail{align-self:start;position:sticky;top:20px;padding:20px;border:1px solid #d4cec1;border-radius:6px;background:#fffdf8;min-height:220px}#detail h3{font-size:27px;margin:7px 0 16px}#detail p{line-height:1.5}#detail button{width:100%;padding:10px;border:0;border-radius:4px;background:#112f35;color:#fff;font-weight:bold;margin-top:8px}.detail-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:18px}.detail-actions button:last-child{background:#8d3b2d}.enc{border-top:1px solid #d4cec1;margin-top:16px;padding-top:12px}.entry{display:flex;justify-content:space-between;border-top:1px solid #e5dfd4;padding:7px 0;font-size:13px}.creator label{display:block;margin:12px 0 5px;color:#607275;font:700 11px Arial;letter-spacing:.6px;text-transform:uppercase}.creator input,.creator select,.creator textarea{width:100%;padding:9px;border:1px solid #c9c7bf;border-radius:4px;background:#fff;color:#1f3134;font:13px Arial}.creator textarea{resize:vertical;line-height:1.45}.creator p,.shared{color:#607275;font-size:12px}.secondary{background:transparent!important;color:#1d5355!important;border:1px solid #1d5355!important}.danger{color:#a33;font-size:12px}.rules-doc{max-width:860px;background:#fffdf8;border:1px solid #d4cec1;border-radius:6px;padding:28px 32px;line-height:1.65}.rules-doc h1,.rules-doc h2,.rules-doc h3{color:#172a2e}.rules-doc table{width:100%;border-collapse:collapse;margin:16px 0}.rules-doc th,.rules-doc td{border:1px solid #d4cec1;padding:8px 10px;text-align:left}.rules-doc blockquote{margin:16px 0;padding:8px 16px;border-left:3px solid #bd5a25;color:#526267}.rules-doc pre{white-space:pre-wrap}@media(max-width:900px){.layout{grid-template-columns:1fr}aside{gap:9px}main{padding:22px 16px}.work{grid-template-columns:1fr}#detail{position:static;order:-1}}@media(max-width:520px){#cards{grid-template-columns:repeat(2,1fr)}.card{padding:12px}.card h3{font-size:16px}}
    </style>`); document.head.insertAdjacentHTML("beforeend", `<style>.card-wrap{position:relative;min-height:150px}.card-wrap .card{width:100%;height:100%}.review-toggle{position:absolute;top:9px;right:9px;width:26px;height:26px;border:1px solid #779392;border-radius:50%;background:#183a40;color:#fff;font-weight:700;line-height:1}.review-toggle.approved{background:#2f725f;border-color:#8cd0ad}.review-toggle.review{background:#9a5732;border-color:#f0bb8c}.proposal-chip{display:inline-block;margin-top:10px;color:#ffe0ad;font:700 9px Arial;letter-spacing:.7px}.proposal-note{margin:14px 0 0;padding:10px;border-left:3px solid #bd5a25;background:#fff4e6;color:#5c4630;font-size:13px;line-height:1.45}.proposal-note b{font:700 10px Arial;letter-spacing:.8px;color:#a64e20}.review-panel{border-top:1px solid #d4cec1;margin-top:18px;padding-top:14px}.review-panel textarea{width:100%;box-sizing:border-box;margin-top:8px;padding:9px;border:1px solid #c9c7bf;border-radius:4px;background:#fff;color:#1f3134;font:13px Arial;line-height:1.45;resize:vertical}.review-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px}.review-actions .approved{background:#2f725f!important}.review-actions .needs-review{background:#9a5732!important}.review-panel .secondary{background:transparent!important;color:#1d5355!important;border:1px solid #1d5355!important}</style>`);
    $("q").oninput = event => { state.query=event.target.value; render(); };
    $("recipe").onchange = event => { state.recipe=event.target.value; render(); };
    $("party").onchange = event => { state.party=Number(event.target.value); render(); }; $("review-filter").onchange = event => { state.reviewFilter=event.target.value; render(); };
    $("difficulty").onchange = event => { state.difficulty=Number(event.target.value); render(); };
    $("rules").onclick = () => showRules();
    $("new-card").onclick = () => showForm();
    $("clear").onclick = () => { state.type="Todos"; state.group="Todos"; state.recipe="Todos"; state.fns=[]; state.query=""; $("q").value=""; render(); };
  }

  function render() {
    state.view="cards";
    $("cards").style.display="grid"; $("detail").style.display="block"; $("detail").style.position="sticky"; document.querySelector(".work").style.gridTemplateColumns="minmax(0,1fr) 340px";
    const parsed=parseSearch();
    const groupsNow=["Todos",...new Set(state.cards.filter(card => state.type==="Todos" || card.type===state.type).map(card => card.group))];
    const recipeIds = parsed.recipe ? new Set(linksForRecipe(parsed.recipe).map(link=>link.card_id)) : null;
    let shown=state.cards.filter(card => {
      if(state.type!=="Todos" && card.type!==state.type) return false;
      if(state.group!=="Todos" && card.group!==state.group) return false;
      if(state.reviewFilter!=="Todos" && (card.type!=="Marca" || reviewOf(card).status!==state.reviewFilter)) return false;
      if(card.type==="Marca") {
        if(recipeIds && !recipeIds.has(card.id)) return false;
        if(parsed.fns.length && !parsed.fns.some(fn => (card.functions||[]).includes(fn))) return false;
      } else if(recipeIds || parsed.fns.length) return false;
      if(parsed.terms.length){const hay=norm(`${card.title} ${card.body} ${(card.keywords||[]).join(" ")} ${(card.functions||[]).join(" ")}`);if(!parsed.terms.every(term=>hay.includes(term)))return false}
      return true;
    });
    if(parsed.recipe || parsed.fns.length) shown.sort((a,b)=>{ const priority=(parsed.recipe?priorityFor(parsed.recipe,b.id)-priorityFor(parsed.recipe,a.id):0); const functionMatches=parsed.fns.filter(fn=>(b.functions||[]).includes(fn)).length-parsed.fns.filter(fn=>(a.functions||[]).includes(fn)).length; return priority || functionMatches || a.title.localeCompare(b.title,"pt-BR"); });
    const monsters=state.type==="Adversário";
    $("mark-tools").style.display=state.type==="Marca"?"block":"none"; $("monster-tools").style.display=monsters?"block":"none";
    $("types").innerHTML=["Todos","Marca","Adversário"].map(type => `<button class="${state.type===type?"active":""}" data-type="${type}">${type==="Todos"?"Tudo":type==="Marca"?"Marcas":"Adversários"}</button>`).join("");
    $("groups").innerHTML=groupsNow.map(group => `<button class="${state.group===group?"active":""}" data-group="${esc(group)}">${esc(group)}</button>`).join("");
    $("recipe").innerHTML=`<option>Todos</option>${state.recipes.map(r=>`<option>${esc(r.name)}</option>`).join("")}`; $("recipe").value=state.recipe; $("review-filter").value=state.reviewFilter;
    const availableFns=functionOrder.filter(fn=>state.cards.some(c=>c.type==="Marca"&&(c.functions||[]).includes(fn)));
    $("functions").innerHTML=`<button class="${!state.fns.length?"active":""}" data-fn="Todos">Todas</button>${availableFns.map(fn=>`<button class="${state.fns.includes(fn)?"active":""}" data-fn="${esc(fn)}">${esc(fn)}</button>`).join("")}`;
    $("difficulty").value=state.difficulty;
    $("budget").innerHTML=`<b>${label(budget())}</b><br>Escolhidos: ${label(total())}<br>Restam: ${label(budget()-total())}`;
    const intent = [parsed.recipe, ...parsed.fns].filter(Boolean).join(" + ");
    $("heading").textContent=intent||state.group!=="Todos"?intent||state.group:state.type==="Todos"?"Todas as cartas":state.type==="Marca"?"Marcas":"Adversários";
    $("sub").textContent=intent?`Busca interpretada como: ${intent}. As cartas que cobrem mais de uma intenção aparecem primeiro.${parsed.terms.length?` Texto livre: ${parsed.terms.join(", ")}.`:""}`:monsters?"Monte uma cena dentro do orçamento.":"Combine receitas, funções e busca livre. Recomendações não restringem escolhas.";
    const recipe=parsed.recipe?recipeByName(parsed.recipe):null; $("recipe-summary").className=recipe?"recipe-summary":""; $("recipe-summary").innerHTML=recipe?`<b>${esc(recipe.name)}</b><p>${esc(recipe.description)}</p>`:"";
    $("count").textContent=`${shown.length} cartas`; $("sync-status").textContent=state.status||"Baralho compartilhado";
    $("types").querySelectorAll("button").forEach(button => button.onclick=()=>{state.type=button.dataset.type;state.group="Todos";if(state.type!=="Marca"){state.recipe="Todos";state.fns=[];state.reviewFilter="Todos"}render()});
    $("groups").querySelectorAll("button").forEach(button => button.onclick=()=>{state.group=button.dataset.group;render()});
    $("functions").querySelectorAll("button").forEach(button => button.onclick=()=>{const fn=button.dataset.fn;if(fn==="Todos")state.fns=[];else state.fns=state.fns.includes(fn)?state.fns.filter(item=>item!==fn):[...state.fns,fn];render()});
    if(!shown.length){$("cards").innerHTML='<p>Nenhuma carta encontrada. Tente remover um filtro ou buscar outro termo.</p>';$("detail").innerHTML='<div>Sem resultados para esta combinação.</div>';return}
    const selected=shown.find(card=>key(card)===state.selected)||shown[0]; state.selected=key(selected);
    $("cards").innerHTML=shown.map(card=>{const p=parsed.recipe?priorityFor(parsed.recipe,card.id):0;const review=reviewOf(card);return `<article class="card-wrap"><button class="card ${key(card)===state.selected?"selected":""} ${p===3?"core":""}" data-card="${encodeURIComponent(key(card))}"><small>${esc(card.type)} · ${esc(card.group)}${p===3?" · INÍCIO RÁPIDO":""}${card.type==="Adversário"?` · ${label(points(card))}`:""}</small><h3>${esc(card.title)}</h3><p>${esc(plain(card.body).slice(0,112))}...</p>${card.type==="Marca"&&card.functions?.length?`<div class="chips">${card.functions.map(fn=>`<span class="chip">${esc(fn)}</span>`).join("")}</div>`:""}${card.proposal?`<span class="proposal-chip">PROPOSTA</span>`:""}</button>${card.type==="Marca"?`<button class="review-toggle ${review.status}" data-approve="${encodeURIComponent(key(card))}" title="${review.status==="approved"?"Remover aprovação":"Aprovar Marca"}">${review.status==="approved"?"✓":review.status==="review"?"!":"○"}</button>`:""}</article>`}).join("");
    $("cards").querySelectorAll(".card[data-card]").forEach(button=>button.onclick=()=>{state.selected=decodeURIComponent(button.dataset.card);render()});
    $("cards").querySelectorAll("[data-approve]").forEach(button=>button.onclick=async()=>{const card=state.cards.find(entry=>key(entry)===decodeURIComponent(button.dataset.approve));const review=reviewOf(card);await saveReview(card,review.status==="approved"?"pending":"approved",review.note)});
    showDetail(selected);
  }

  async function showRules() {
    state.view="rules"; $("heading").textContent="Regras do sistema"; $("sub").textContent="Texto de referência do sistema."; $("count").textContent=""; $("recipe-summary").innerHTML=""; document.querySelector(".work").style.gridTemplateColumns="minmax(0,1fr)"; $("detail").style.display="none"; $("cards").style.display="block"; $("cards").innerHTML="<p>Carregando regras...</p>";
    if(!client){$("cards").innerHTML="<p>Não foi possível carregar as regras.</p>";return}
    const {data,error}=await client.from("system_rules").select("content, updated_at").eq("id",1).single(); if(error||!data){$("cards").innerHTML=`<p>${esc(error?.message||"Regras não encontradas.")}</p>`;return}
    const html=window.marked?window.marked.parse(data.content):`<pre>${esc(data.content)}</pre>`; $("cards").innerHTML=`<article class="rules-doc">${html}</article>`;
  }

  function showDetail(card){
    const proposal=proposalOf(card);
    const chosen=state.cards.filter(entry=>state.chosen[key(entry)]);
    const review=reviewOf(card);
    const reviewPanel=card.type==="Marca"?`<section class="review-panel"><small>REVISÃO LOCAL · ${reviewLabel(review.status).toUpperCase()}</small><textarea id="review-note" rows="5" placeholder="O que você quer manter, mudar ou testar nesta Marca?">${esc(review.note)}</textarea><div class="review-actions"><button id="review-approved" class="approved">Aprovar</button><button id="review-needs" class="needs-review">Precisa de revisão</button></div><button id="review-clear" class="secondary">Limpar revisão</button></section>`:"";
    $("detail").innerHTML=`<small>${esc(card.type)} · ${esc(card.group)}</small><h3>${esc(card.title)}</h3>${format(card.body)}${card.type==="Marca"&&card.functions?.length?`<div class="chips">${card.functions.map(fn=>`<span class="chip">${esc(fn)}</span>`).join("")}</div>`:""}${proposal?`<p class="proposal-note"><b>PROPOSTA LOCAL</b><br>${esc(proposal.note||"Texto revisado localmente; ainda não foi publicado.")}</p>`:""}${reviewPanel}${card.type==="Adversário"?'<button id="add">Adicionar ao encontro</button>':''}<div class="detail-actions"><button id="edit">Editar</button><button id="delete">Excluir</button></div>${chosen.length?`<div class="enc"><b>Encontro atual</b>${chosen.map(entry=>`<div class="entry"><span>${esc(entry.title)} × ${state.chosen[key(entry)]}</span><span>${label(points(entry)*state.chosen[key(entry)])}</span></div>`).join("")}</div>`:""}`;
    if($("add"))$("add").onclick=()=>{state.chosen[key(card)]=(state.chosen[key(card)]||0)+1;render()}; $("edit").onclick=()=>showForm(card); $("delete").onclick=()=>removeCard(card);
    if(card.type==="Marca"){ const note=()=>$("review-note").value.trim(); $("review-approved").onclick=()=>saveReview(card,"approved",note()); $("review-needs").onclick=()=>saveReview(card,"review",note()); $("review-clear").onclick=()=>saveReview(card,"pending",""); }
  }

  function showForm(existing=null){
    const type=existing?.type||"Marca"; $("detail").innerHTML=`<div class="creator"><small>${existing?"EDITAR CARTA":"NOVA CARTA"}</small><h3>${existing?"Atualize a carta":"Adicionar ao compêndio"}</h3><label>Tipo</label><select id="card-type"><option value="Marca">Marca</option><option value="Adversário">Adversário</option></select><label>Família ou papel</label><select id="card-group"></select><label>Nome</label><input id="card-title" maxlength="160" placeholder="Nome da carta"><label>Texto da carta</label><textarea id="card-body" rows="11"></textarea><label>Senha</label><input id="card-password" type="password" autocomplete="current-password" placeholder="Senha de edição"><p class="danger" id="form-message"></p><button id="save-card">${existing?"Salvar alterações":"Adicionar carta"}</button><button class="secondary" id="cancel-card">Cancelar</button></div>`;
    const typeField=$("card-type"),groupField=$("card-group"),titleField=$("card-title"),bodyField=$("card-body"); const fillGroups=()=>{groupField.innerHTML=groups[typeField.value].map(group=>`<option>${esc(group)}</option>`).join("")}; typeField.value=type;fillGroups(); if(existing){groupField.value=existing.group;titleField.value=existing.title;bodyField.value=existing.body}else bodyField.placeholder=type==="Marca"?"Descrição da Marca.\n\n**Efeito:** quando...\n\n**Custo:** quando...":"**Papel | Tipo | Pontos**\n\n**Capacidade d6 | Vitalidade 2**\n\n**Marca: Nome.** Efeito.\n\n**Instinto:** objetivo."; typeField.onchange=fillGroups; $("cancel-card").onclick=render;
    $("save-card").onclick=async()=>{const card={card_type:typeField.value,card_group:groupField.value,title:titleField.value.trim(),body:bodyField.value.trim()};const password=$("card-password").value;if(!card.title||!card.body||!password){$("form-message").textContent="Preencha a carta e a senha.";return}$("save-card").disabled=true;const result=await admin(existing?"update":"insert",{password,card,id:existing?.id});if(result.error){$("form-message").textContent=result.error;$("save-card").disabled=false;return}state.status="Carta salva.";await loadCloud()};
  }

  async function admin(action,payload){try{const response=await fetch(`${SUPABASE_URL}/functions/v1/card-collection-admin`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({action,...payload})});return await response.json()}catch{return{error:"Não foi possível conectar ao Card Collection."}}}
  async function removeCard(card){const password=window.prompt(`Digite a senha para excluir “${card.title}”.`);if(!password)return;const result=await admin("delete",{password,id:card.id});if(result.error){window.alert(result.error);return}state.status="Carta excluída.";await loadCloud()}
  async function loadReviews(){
    try { const response=await fetch("/api/reviews",{cache:"no-store"}); const data=await response.json(); state.reviews=data.reviews||{}; }
    catch { state.status="Revisões locais indisponíveis."; }
  }
  async function saveReview(card,status,note){
    const next={...state.reviews,[key(card)]:{status,note}};
    const response=await fetch("/api/reviews",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({reviews:next})});
    const data=await response.json(); if(data.error){window.alert(data.error);return} state.reviews=data.reviews||{}; state.status="Revisão local salva."; render();
  }
  async function loadProposals(){
    try { const response=await fetch("/ajustes-locais.json",{cache:"no-store"}); const data=await response.json(); state.proposals=data.proposals||{}; }
    catch { state.proposals={}; }
  }
  async function loadCloud(){
    if(!client)return; state.status="Atualizando cartas..."; render();
    const [cardsRes,recipesRes,linksRes]=await Promise.all([
      client.from("compendium_cards").select("id, card_type, card_group, title, body, functions, keywords, created_at").order("created_at",{ascending:true}),
      client.from("recipes").select("id, name, description, keywords").order("name"),
      client.from("recipe_cards").select("recipe_id, card_id, priority")
    ]);
    if(cardsRes.error){state.status=cardsRes.error.message;render();return}
    state.cards=cardsRes.data.filter(row=>!state.proposals[row.id]?.deleted).map(row=>{const proposal=state.proposals[row.id]||{};return {id:row.id,type:row.card_type,group:row.card_group,title:proposal.title||row.title,body:proposal.body||row.body,functions:row.functions||[],keywords:row.keywords||[],proposal:proposal.body||proposal.title?proposal:null};}); state.recipes=recipesRes.data||[]; state.recipeLinks=linksRes.data||[]; state.status=Object.keys(state.proposals).length?"Baralho compartilhado com propostas locais":"Baralho compartilhado"; render();
  }
  function subscribe(){if(!client||state.channel)return;state.channel=client.channel("card-collection-shared").on("postgres_changes",{event:"*",schema:"public",table:"compendium_cards"},()=>loadCloud()).subscribe()}
  async function start(){shell();await loadReviews();await loadProposals();render();if(!client){state.status="Não foi possível carregar as cartas.";render();return}await loadCloud();subscribe();document.addEventListener("visibilitychange",()=>{if(!document.hidden)loadCloud()})}
  start();
})();
