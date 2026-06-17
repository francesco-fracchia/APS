"""Per ogni quiz, verifica se le keyword chiave della domanda+spiegazione
appaiono nei PDF di Sofia/Blue. Se la copertura è bassa, segnala l'orfano.
"""
import re
import unicodedata

# stopwords italiane + parole troppo generiche per filtrarle
STOP = set('''
di a da in con su per tra fra il lo la i gli le un una uno e o ma se che chi cui è sono
ha ho hai abbiamo avete hanno si mi ti vi ci ne al del dei delle dal dalla nel nei negli
sul sulla quale cosa come quali quando dove quanto perché perche non solo anche sempre mai
ogni molto tanto più meno già ancora dopo prima sopra sotto dentro fuori vero falso questo
quella quello queste questi nelle dalle dagli dello allo quel quegli quegli alle dello degli
essere fare avere stare dire stato fatto dato detto fanno fanno usa usato usando
sua suo sue suoi loro nostro vostro tutto tutti tutta tutte alcuni alcune qualche
si no si quindi infatti pero ovvero cioe poi mentre anche cosi nemmeno neanche
puo possono devo deve dovrebbe puoi puo potresti potrebbe sono uno una loro mio mia tuo tua
nessun nessuna nessuno tante tanto suo questo qui qua la
quale qual giusto sbagliato risposta domanda opzione affermazione corretto vera falsa
risposte affermazioni esempi caso casi cose cosa nulla niente null essere
'''.split())

# normalizza testo (lower, no accenti, no punteggiatura)
def norm(s):
    s = s.lower()
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode('ascii')
    s = re.sub(r'<[^>]+>', ' ', s)
    s = re.sub(r'[^a-z0-9 ]', ' ', s)
    return s

def tokens(s):
    toks = norm(s).split()
    return [t for t in toks if len(t) >= 4 and t not in STOP]

# Carica PDF (Sofia + Blue) come una sola "verità"
with open(r'C:\Personale\Uni\2 anno\0 APS\.tmp\sofia.txt', 'r', encoding='utf-8', errors='ignore') as f:
    sofia = norm(f.read())
with open(r'C:\Personale\Uni\2 anno\0 APS\.tmp\blue.txt', 'r', encoding='utf-8', errors='ignore') as f:
    blue = norm(f.read())
PDFS = sofia + ' ' + blue
# Set di parole presenti nei PDF (>=4 char)
pdf_tokens = set(t for t in PDFS.split() if len(t) >= 4)

# Carica il file HTML
with open(r'C:\Personale\Uni\2 anno\0 APS\APS-Studio.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Estrai tutti i quiz: pattern {t:"X", q:"...", o:[...], c:[...], m:..., e:"..."}
# Cerco linee che iniziano con {t:" e contengono o:[
quiz_pattern = re.compile(r'^\{t:"([^"]+)", q:"((?:[^"\\]|\\.)*)"\s*,\s*o:\[((?:[^"\\]|\\.|"(?:[^"\\]|\\.)*")*?)\].*?e:"((?:[^"\\]|\\.)*)"\}', re.M)

orphans = []
total = 0
for line_num, line in enumerate(html.splitlines(), 1):
    line_strip = line.strip()
    if not line_strip.startswith('{t:"'):
        continue
    # è una flashcard o un quiz?
    if 'o:[' not in line_strip:
        continue  # flashcard, skip
    total += 1
    m = re.match(r'\{t:"([^"]+)", q:"((?:[^"\\]|\\.)*)"', line_strip)
    if not m:
        continue
    t = m.group(1)
    q = m.group(2)
    # estrai anche `e:"..."` se c'è
    em = re.search(r'e:"((?:[^"\\]|\\.)*)"', line_strip)
    e = em.group(1) if em else ''
    # estrai le opzioni
    om = re.search(r'o:\[(.*?)\],\s*c:', line_strip)
    o_text = om.group(1) if om else ''
    # opzione corretta
    cm = re.search(r'c:\[([^\]]+)\]', line_strip)
    correct_idx = []
    if cm:
        correct_idx = [int(x.strip()) for x in cm.group(1).split(',') if x.strip()]
    # parse opzioni: "...", "..."
    opts = re.findall(r'"((?:[^"\\]|\\.)*)"', o_text)
    correct_opts = [opts[i] for i in correct_idx if i < len(opts)]
    correct_text = ' '.join(correct_opts)

    # Keyword da cercare: dalla domanda Q + risposta corretta + spiegazione E
    keywords = set(tokens(q)) | set(tokens(correct_text)) | set(tokens(e))
    if not keywords:
        continue
    hits = keywords & pdf_tokens
    coverage = len(hits) / len(keywords) if keywords else 0
    # se nessuna keyword è nei PDF → orfano sicuro
    # se < 30% → orfano probabile
    if coverage < 0.50:
        orphans.append({
            'line': line_num,
            't': t,
            'q': q[:100],
            'e': e[:80],
            'cov': coverage,
            'keywords': sorted(keywords),
            'hits': sorted(hits),
            'missing': sorted(keywords - pdf_tokens)
        })

print(f'Quiz totali: {total}')
print(f'Quiz orfani (coverage < 25%): {len(orphans)}')
print()
print('--- ORFANI (coverage < 25%) ---')
# raggruppa per topic
from collections import defaultdict
by_t = defaultdict(list)
for o in orphans:
    by_t[o['t']].append(o)

for t in sorted(by_t.keys()):
    print(f'\n=== TOPIC: {t} ({len(by_t[t])} orfani) ===')
    for o in by_t[t]:
        print(f"riga {o['line']} [cov={o['cov']:.0%}] Q: {o['q']}")
        print(f"  hits: {o['hits']}")
        print(f"  miss: {o['missing']}")
