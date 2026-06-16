// Convertitore Markdown -> HTML pronto per lo STUDIO (no dipendenze esterne).
// Produce: indice laterale sticky, riquadri colorati per i contenuti speciali,
// tipografia leggibile a video, tabelle a righe alternate, e stampa pulita.
const fs = require('fs');
const path = require('path');

const FILES = [
  '00_Guida_Studio_APS.md',
  'Flashcard_GRASP_GoF.md',
  'GRASP_GoF_Manuale_Completo.md',
  'Domande_Orale.md',
];

function escHtml(s){
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function slug(s){
  return s.toLowerCase()
    .replace(/[àáâãä]/g,'a').replace(/[èéêë]/g,'e').replace(/[ìíîï]/g,'i')
    .replace(/[òóôõö]/g,'o').replace(/[ùúûü]/g,'u').replace(/[ç]/g,'c')
    .replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80);
}

// inline: protegge code span, escape, poi bold/italic/link, poi ripristina code
function inline(text){
  const codes = [];
  text = text.replace(/`([^`]+)`/g, (m,c)=>{ codes.push(c); return ' '+(codes.length-1)+' '; });
  text = escHtml(text);
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  text = text.replace(/ (\d+) /g, (m,i)=> '<code>'+escHtml(codes[+i])+'</code>');
  return text;
}

// split di una riga tabella sui '|' rispettando i backtick
function splitRow(row){
  row = row.trim().replace(/^\|/,'').replace(/\|$/,'');
  const cells=[]; let cur=''; let inCode=false;
  for(const ch of row){
    if(ch==='`') inCode=!inCode;
    if(ch==='|' && !inCode){ cells.push(cur); cur=''; }
    else cur+=ch;
  }
  cells.push(cur);
  return cells.map(c=>c.trim());
}

// Riconosce il tipo di callout dal contenuto markdown del blockquote
function calloutClass(raw){
  if(/🧒|in parole semplici/i.test(raw))                                              return ' class="callout note"';
  if(/esempio (gestionale|sul gestionale)|nel (mio|tuo) gestionale|aggancio gestionale/i.test(raw)) return ' class="callout gestionale"';
  if(/⚠️|trappola|attenzione|errore (d.esame|comune)|domand[ae] (tipo )?orale/i.test(raw)) return ' class="callout warning"';
  if(/come (allenarsi|studiare|usare|leggere|impostare|disegnare)|protocollo|metodo|cheat ?sheet|frase[- ]jolly/i.test(raw)) return ' class="callout method"';
  if(/stato (della guida|finale)|fonti|aggiornare questo file/i.test(raw))             return ' class="callout meta"';
  return '';
}

function convert(md){
  const lines = md.split(/\r?\n/);
  let html=''; let i=0;
  let listType=null;
  const toc=[]; // {id,text,level}
  function closeList(){ if(listType){ html+='</'+listType+'>\n'; listType=null; } }

  // Estraggo il titolo H1 (primo) per il <title>
  let pageTitle = null;

  while(i<lines.length){
    let line = lines[i];

    // code fence
    if(/^```/.test(line)){
      closeList();
      i++; let buf=[];
      while(i<lines.length && !/^```/.test(lines[i])){ buf.push(lines[i]); i++; }
      i++;
      html += '<pre class="diagram"><code>'+escHtml(buf.join('\n'))+'</code></pre>\n';
      continue;
    }

    // tabella
    if(/\|/.test(line) && i+1<lines.length && /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(lines[i+1]) && /-/.test(lines[i+1])){
      closeList();
      const header = splitRow(line);
      i+=2;
      html += '<div class="table-wrap"><table>\n<thead><tr>'+header.map(h=>'<th>'+inline(h)+'</th>').join('')+'</tr></thead>\n<tbody>\n';
      while(i<lines.length && /\|/.test(lines[i]) && lines[i].trim()!==''){
        const cells = splitRow(lines[i]);
        html += '<tr>'+cells.map(c=>'<td>'+inline(c)+'</td>').join('')+'</tr>\n';
        i++;
      }
      html += '</tbody></table></div>\n';
      continue;
    }

    // hr
    if(/^---+\s*$/.test(line) || /^\*\*\*+\s*$/.test(line)){ closeList(); html+='<hr>\n'; i++; continue; }

    // heading
    let h = line.match(/^(#{1,6})\s+(.*)$/);
    if(h){
      closeList();
      const lv=h[1].length;
      const text=h[2];
      const id = slug(text);
      if(lv===1 && !pageTitle) pageTitle = text;
      if(lv===2) toc.push({id,text,level:2});
      else if(lv===3) toc.push({id,text,level:3});
      html+='<h'+lv+' id="'+id+'">'+inline(text)+'<a class="anchor" href="#'+id+'" aria-hidden="true">¶</a></h'+lv+'>\n';
      i++; continue;
    }

    // blockquote (con classe automatica per callout colorati)
    if(/^>\s?/.test(line)){
      closeList();
      let buf=[];
      while(i<lines.length && /^>\s?/.test(lines[i])){ buf.push(lines[i].replace(/^>\s?/,'')); i++; }
      const raw = buf.join('\n');
      const cls = calloutClass(raw);
      // converte gli a-capo come <br> ma rispetta i paragrafi separati da riga vuota
      const parts = raw.split(/\n\s*\n/);
      const inner = parts.map(p=>'<p>'+inline(p.replace(/\n/g,' '))+'</p>').join('');
      html += '<blockquote'+cls+'>'+inner+'</blockquote>\n';
      continue;
    }

    // liste
    let ol = line.match(/^(\s*)\d+\.\s+(.*)$/);
    let ul = line.match(/^(\s*)[-*]\s+(.*)$/);
    if(ol){ if(listType!=='ol'){ closeList(); html+='<ol>\n'; listType='ol'; } html+='<li>'+inline(ol[2])+'</li>\n'; i++; continue; }
    if(ul){ if(listType!=='ul'){ closeList(); html+='<ul>\n'; listType='ul'; } html+='<li>'+inline(ul[2])+'</li>\n'; i++; continue; }

    // riga vuota
    if(line.trim()===''){ closeList(); i++; continue; }

    // paragrafo
    closeList();
    html += '<p>'+inline(line)+'</p>\n';
    i++;
  }
  closeList();
  return { html, toc, pageTitle };
}

const CSS = `
<style>
  :root{
    --bg: #f3f5f8;
    --card: #ffffff;
    --ink: #1a2433;
    --muted: #5b6878;
    --accent: #0b3d66;
    --accent-2: #1f6fb3;
    --border: #d9dee5;
    --code-bg: #f5f7fa;
    --note: #3498db;     --note-bg: #eaf4fb;
    --gest: #27ae60;     --gest-bg: #eafaf1;
    --warn: #e67e22;     --warn-bg: #fdf2e9;
    --meth: #8e44ad;     --meth-bg: #f4ecf7;
    --meta: #7f8c8d;     --meta-bg: #ecf0f1;
  }
  *{ box-sizing:border-box; }
  html,body{ margin:0; padding:0; }
  body{
    background: var(--bg);
    color: var(--ink);
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 16px; line-height: 1.55;
  }
  .layout{
    display:grid;
    grid-template-columns: 270px minmax(0, 1fr);
    max-width: 1240px;
    margin: 0 auto;
    gap: 24px;
    padding: 24px;
  }
  /* SIDEBAR / TOC */
  aside.toc{
    position: sticky; top: 24px;
    align-self: start;
    max-height: calc(100vh - 48px); overflow-y: auto;
    padding: 16px 14px;
    background: var(--card); border: 1px solid var(--border); border-radius: 10px;
    font-family: 'Inter','Segoe UI', Arial, sans-serif; font-size: 13.5px; line-height: 1.45;
    box-shadow: 0 1px 2px rgba(0,0,0,.03);
  }
  aside.toc .toc-title{
    font-weight: 700; color: var(--accent); margin: 0 0 10px 0;
    font-size: 13px; letter-spacing: .04em; text-transform: uppercase;
  }
  aside.toc ol{ list-style: none; padding: 0; margin: 0; }
  aside.toc li{ margin: 3px 0; }
  aside.toc li.sub{ padding-left: 14px; color: var(--muted); font-size: 12.5px; }
  aside.toc a{ color: var(--accent); text-decoration: none; }
  aside.toc a:hover{ text-decoration: underline; }
  /* MAIN */
  main.content{
    background: var(--card); border: 1px solid var(--border); border-radius: 12px;
    padding: 28px 36px; max-width: 840px;
    box-shadow: 0 1px 2px rgba(0,0,0,.04);
  }
  h1, h2, h3, h4, h5, h6{
    font-family: 'Inter','Segoe UI', Arial, sans-serif;
    color: var(--accent);
    line-height: 1.25;
  }
  h1{ font-size: 28px; border-bottom: 3px solid var(--accent); padding-bottom: 8px; margin: 0 0 24px; }
  h2{ font-size: 22px; border-bottom: 1px solid var(--border); padding-bottom: 6px; margin: 32px 0 12px; }
  h3{ font-size: 17px; color: var(--accent-2); margin: 22px 0 8px; }
  h4{ font-size: 15px; color: var(--accent-2); margin: 18px 0 6px; }
  h2 .anchor, h3 .anchor, h4 .anchor{
    opacity: 0; margin-left: 6px; text-decoration: none; color: var(--muted); font-weight: normal;
  }
  h2:hover .anchor, h3:hover .anchor, h4:hover .anchor{ opacity: 1; }
  p{ margin: .6em 0; }
  strong{ color: #000; }
  a{ color: var(--accent-2); }
  /* CODE / DIAGRAMS */
  code{
    font-family: 'JetBrains Mono','Consolas','Courier New', monospace;
    background: var(--code-bg); padding: 1px 5px; border-radius: 3px;
    font-size: 0.88em;
  }
  pre.diagram{
    background: var(--code-bg); border: 1px solid var(--border); border-left: 4px solid var(--accent);
    border-radius: 6px; padding: 10px 14px; overflow-x: auto;
    white-space: pre; page-break-inside: avoid;
  }
  pre.diagram code{
    font-family: 'JetBrains Mono','Consolas','Courier New', monospace;
    font-size: 12.5px; line-height: 1.35; background: none; padding: 0; border: 0;
  }
  /* TABLES */
  .table-wrap{ overflow-x: auto; margin: 14px 0; }
  table{ border-collapse: collapse; width: 100%; font-size: 14px; page-break-inside: avoid; }
  th, td{ border: 1px solid var(--border); padding: 6px 9px; text-align: left; vertical-align: top; }
  th{ background: var(--accent); color: #fff; font-family: 'Inter','Segoe UI', Arial, sans-serif; font-weight: 600; }
  tr:nth-child(even) td{ background: #f7f9fb; }
  /* LISTS */
  ul, ol{ margin: .5em 0 .9em 1.3em; padding-left: .4em; }
  li{ margin: .2em 0; }
  /* CALLOUTS (blockquote colorati) */
  blockquote{
    border-left: 4px solid var(--muted);
    background: #fafbfd;
    margin: 14px 0; padding: 12px 16px;
    border-radius: 6px; page-break-inside: avoid;
  }
  blockquote p{ margin: .3em 0; }
  blockquote.callout.note{      border-color: var(--note); background: var(--note-bg); }
  blockquote.callout.gestionale{ border-color: var(--gest); background: var(--gest-bg); }
  blockquote.callout.warning{    border-color: var(--warn); background: var(--warn-bg); }
  blockquote.callout.method{     border-color: var(--meth); background: var(--meth-bg); }
  blockquote.callout.meta{       border-color: var(--meta); background: var(--meta-bg); color: #555; font-style: italic; }
  /* HR */
  hr{ border: 0; border-top: 1px solid var(--border); margin: 28px 0; }
  /* TIP BANNER */
  .study-tip{
    background: linear-gradient(180deg, #fff8e1, #fff3cd);
    border: 1px solid #f1c40f; border-radius: 8px;
    padding: 10px 14px; margin: 0 0 18px;
    font-family: 'Inter','Segoe UI', Arial, sans-serif; font-size: 14px;
  }
  .study-tip b{ color: #7a5d00; }
  /* RESPONSIVE */
  @media (max-width: 980px){
    .layout{ grid-template-columns: 1fr; padding: 14px; }
    aside.toc{ position: static; max-height: 320px; }
    main.content{ padding: 18px 18px; }
  }
  /* PRINT */
  @media print{
    @page{ size: A4; margin: 14mm; }
    body{ background: #fff; font-size: 11.5pt; }
    .layout{ display:block; padding: 0; max-width: none; }
    aside.toc{ display: none; }
    main.content{ box-shadow: none; border: 0; padding: 0; max-width: none; }
    a{ color: #000; text-decoration: none; }
    h2 .anchor, h3 .anchor, h4 .anchor{ display: none; }
    blockquote, pre.diagram, table{ page-break-inside: avoid; }
    h1, h2, h3, h4{ page-break-after: avoid; }
    .study-tip{ display: none; }
  }
</style>`;

function buildToc(toc){
  if(!toc.length) return '';
  let out = '<aside class="toc"><div class="toc-title">Indice</div><ol>';
  for(const t of toc){
    const cls = t.level === 3 ? ' class="sub"' : '';
    out += '<li'+cls+'><a href="#'+t.id+'">'+escHtml(t.text)+'</a></li>';
  }
  out += '</ol></aside>';
  return out;
}

const dir = __dirname;
for(const f of FILES){
  const p = path.join(dir, f);
  if(!fs.existsSync(p)){ console.log('SKIP (non trovato): '+f); continue; }
  const md = fs.readFileSync(p,'utf8');
  const { html, toc, pageTitle } = convert(md);
  const title = pageTitle || f.replace(/\.md$/,'');
  const tip = '<div class="study-tip">💡 <b>Studia attivo</b>: copri la risposta, dilla a voce, controlla. Per gli schemi UML <b>disegna a mano</b> prima di guardare. Ripeti a distanza: oggi → +1g → +3g → +7g.</div>';
  const out =
    '<!doctype html>\n<html lang="it"><head><meta charset="utf-8">'+
    '<meta name="viewport" content="width=device-width, initial-scale=1">'+
    '<title>'+escHtml(title)+'</title>'+CSS+'</head><body>\n'+
    '<div class="layout">'+
      buildToc(toc)+
      '<main class="content">'+tip+html+'</main>'+
    '</div>\n</body></html>';
  const outPath = path.join(dir, f.replace(/\.md$/,'') + '.html');
  fs.writeFileSync(outPath, out, 'utf8');
  console.log('OK -> '+f.replace(/\.md$/,'')+'.html');
}
