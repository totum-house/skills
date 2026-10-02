# Auditoria técnica do site do lead

Rode sempre que houver site. É o ativo de autoridade mais forte da apresentação:
dado real, verificável, específico daquele negócio, que ninguém mais levou para a mesa dele.

## Procedimento

Tente primeiro a API pública do PageSpeed do Google:

```
https://www.googleapis.com/pagespeedonline/v5/runPagespeed
  ?url=<URL>&strategy=mobile
  &category=performance&category=seo&category=accessibility&category=best-practices
```

Ela tem cota diária e frequentemente retorna erro de limite. Quando isso acontecer,
faça a auditoria manual, que já entrega os achados mais úteis para venda.

## Script de auditoria manual

```python
import urllib.request, time, re
url = 'https://SITE_DO_LEAD/'
req = urllib.request.Request(url, headers={'User-Agent':
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'})
t = time.time(); r = urllib.request.urlopen(req, timeout=40); data = r.read()
h = data.decode('utf-8','ignore')

print('tempo de resposta (s):', round(time.time()-t, 2))
print('HTML bruto (KB):', round(len(data)/1024, 1))
print('compressao:', r.headers.get('Content-Encoding') or 'DESATIVADA')
print('Pixel do Meta:', 'fbq(' in h or 'connect.facebook.net' in h)
print('Google Analytics:', 'gtag(' in h or 'googletagmanager' in h)
print('Tag Manager:', 'GTM-' in h)
print('H1 na home:', len(re.findall(r'<h1', h)))
print('meta description:', bool(re.search(r'name=["\']description["\']', h)))
print('schema.org:', 'schema.org' in h)
print('scripts:', len(re.findall(r'<script', h)))
print('css bloqueante:', len(re.findall(r'rel=["\']stylesheet', h)))
print('imagens na home:', len(re.findall(r'<img', h)))
```

## Como traduzir cada achado para linguagem de venda

| Achado técnico | Como falar na reunião |
|---|---|
| Sem Pixel do Meta, mas com GA e GTM | "A camada de tag já existe. O Pixel simplesmente nunca foi colocado. Hoje o Meta não sabe quem virou cliente" |
| Nenhum H1 | "A página não diz ao Google qual é o assunto dela" |
| Sem meta description | "O Google inventa o texto que aparece na busca de vocês" |
| Compressão desativada | "Cada visitante baixa X KB a mais do que precisaria" |
| Muitos scripts e CSS | "São N arquivos travando o carregamento antes de a pessoa ver qualquer coisa" |
| Sem schema.org | "O Google não consegue entender que isso é um serviço local" |

## Regras

- Nunca abra a apresentação com esse achado. Ele pertence ao card **Processo** do slide
  de diagnóstico, e é a carta que prova que você estudou o negócio dele.
- Apresente como tabela no modal, sem jargão. "Pixel do Meta instalado: Não" é mais
  forte do que qualquer explicação técnica.
- Traduza sempre em consequência, nunca em nomenclatura.
- Se a auditoria não puder rodar por falta de rede, diga ao usuário e siga sem ela.
  Nunca invente resultado de auditoria.

## Redes sociais

O Instagram bloqueia acesso automatizado por robots.txt e o Facebook idem.
Não tente raspar, não invente número.

Caminhos que funcionam:
1. O usuário envia prints do perfil e dos Reels. Você analisa visualmente: bio, destaques,
   consistência de grade, frequência, formato dominante, presença de chamada para ação,
   coerência da identidade visual. Este caminho é confiável e rende um bom bloco de slide.
2. O cliente concede acesso pelo conector oficial da Meta, quando disponível no ambiente.
3. Dados informados manualmente pelo usuário.

Sempre diga de onde veio o dado. Análise de print é análise qualitativa, e isso deve estar
claro no modal.
