# Totum Visual Codes: biblioteca consolidada

Versão do Lab: 0.3.0 (12/11/2026). Changelog: a receita colada no prompt fica em 3 a 4 códigos; os estruturais saem porque a referência cobre layout. Base: `visual-codes.json` v0.1.0 do Totum Studio, idêntico ao MD exportado pelo ChatGPT em 23/10/2026. Os 40 códigos abaixo têm texto literal da fonte.

## 1. Regra de receita (versão Lab)

No prompt colado entram **3 a 4 códigos**. O bloco Visual Codes continua obrigatório (regra de 12/11/2026).

| O que entra | Quantidade | Observação |
|:--|:--|:--|
| Emoção | exatamente 1 | uma linha no prompt |
| Copy | `/literal_copy` | texto exato, com acentos e pontuação |
| Marca | `/brand_lock` | só as cores e a tipografia da marca |
| Logo | `/logo_safezone` só se o logo NÃO estiver anexado | com o arquivo anexado, a linha é `Use o logo e os grafismos anexados.` |

Ficam de fora do prompt, porque a referência já cobre: `/carousel`, `/visual_continuity`, `/type_hierarchy` e os códigos de formato, composição e layout. Fotografia, narrativa e código de cliente também não entram no texto colado. Pessoa, produto e local vão como anexo.

Diferença para o catálogo original: o original pede 6 a 10 códigos. A v0.2.0 do Lab usava teto 7 e cena sem texto. Esta versão cola a peça inteira no ChatGPT e deixa a receita enxuta.

### Saída obrigatória antes de gerar

```text
RECEITA
<códigos>

POR QUE
<uma frase por código que muda o resultado>

PENDÊNCIAS
<só o que impede a geração>
```

Nunca gerar sem mostrar a receita. Na correção, trocar **um código por vez**.

### Conflitos

Estes conflitos valem para ler a peça. Não entram no prompt colado.

- `/centered_impact` x `/asymmetric_flow`: escolha a composição principal.
- `/studio_controlled` x `/real_environment`: estúdio ou local real, nunca os dois.
- Conflitos práticos (não declarados no JSON, observados): `/bold_brutalist` x `/premium_showcase`; `/urgency` x `/premium_showcase`; `/negative_space` x `/data_focus` quando o dado é longo.
- Ausência de conflito declarado não garante compatibilidade. Avalie o efeito combinado.

### Receitas-base

```text
Anúncio, logo anexado:  /confidence /literal_copy /brand_lock
Post, logo anexado:     /curiosity /literal_copy /brand_lock
Carrossel, logo anexado: /curiosity /literal_copy /brand_lock
Sem o arquivo do logo:  /confidence /literal_copy /brand_lock /logo_safezone
```

## 2. Negativos universais (bloco EVITAR padrão)

Entram em toda peça, somados ao `nunca` do brand kit e às anti-referências do cliente. Nada de nicho de cliente aqui.

```text
plastic skin, over smoothing, gibberish typography, malformed text, extra fingers,
malformed hands, identity drift, face blending, watermark, signature, amateur lighting,
uncanny face, oversaturated colors, cluttered composition, centered by inertia,
multiple competing focal points, explanatory typography, stock-photo smile,
collage look, cropped text, wrong Portuguese accents, emoji, generated logo
```

Em português, no bloco Negativos do prompt: pele plástica, suavização excessiva, texto inventado ou ilegível, CTA inventado, dedo extra, mão deformada, rosto diferente da referência, marca d'água, assinatura, luz amadora, cores saturadas demais, composição poluída, sorriso de banco de imagem, cara de colagem, texto cortado, erro de acentuação, emoji, logo gerado pela IA. Some os negativos da marca. Não proíba elemento que está na referência.

Ciclo de aprendizado: toda peça reprovada vira anti-referência no `receitas.md` do cliente, com o motivo em uma linha. O motivo entra no EVITAR da próxima peça daquele cliente.

## 3. Códigos de cliente

Códigos observados em peças reais que **não** entram na biblioteca geral. Vivem no `receitas.md` de cada brand kit e contam no teto como código de direção de arte.

- uPixel: `/pixel_3d_world`, `/stacked_orange_labels`, `/brush_keyword`, `/image_first_lettering`, `/proof_without_fake_ui`, `/compact_copy_block`.
- Totum: `/kv_objeto_central`, `/cursiva_destaque`, `/marcacao_manual` (sistema v1.1).

## 4. Os 40 códigos

O catálogo permanece para ler uma peça e nomear o que se vê. A coluna "expansão" não é mais texto para colar no motor. No prompt entram só a emoção, `/literal_copy`, `/brand_lock` e, sem o logo anexado, `/logo_safezone`.


### Formato (8)

| Código | Nome | Intenção | Expansão (texto que entra no prompt) | Melhor para | Conflita |
|:--|:--|:--|:--|:--|:--|
| `/meta_ad` | Anúncio Meta | Peça para conversão ou leads em Instagram e Facebook. | Composição mobile-first, promessa compreendida em até 3 segundos, contraste forte no terço superior e CTA claramente identificável. | leads, conversão, WhatsApp |  |
| `/organic_post` | Post orgânico | Peça de feed que educa, posiciona ou gera conversa. | Peça integrada ao feed, com uma ideia principal, hierarquia limpa e marca reconhecível sem estética agressiva de anúncio. | educação, posicionamento, engajamento |  |
| `/carousel` | Carrossel | Sequência de slides com progressão narrativa. | Construir capa com lacuna de curiosidade, um papel claro por slide, ritmo variável e fechamento com uma única ação. | educação, storytelling, prova |  |
| `/story` | Story | Peça vertical para consumo rápido e interação. | Formato 9:16 com zonas seguras para interface, leitura imediata, poucos elementos e CTA dentro da área útil. | urgência, interação, bastidores |  |
| `/reel_cover` | Capa de Reels | Capa legível no feed e na grade do perfil. | Título muito curto, ponto focal central protegido contra cortes, contraste alto e reconhecimento em miniatura. | vídeo, série, conteúdo recorrente |  |
| `/newspaper_ad` | Anúncio de jornal | Peça com linguagem editorial impressa. | Hierarquia editorial, título dominante, uso intencional de colunas, contraste em preto e branco ou paleta restrita e leitura linear. | campanha conceitual, manifesto, estética editorial |  |
| `/3d_billboard` | Outdoor 3D | Cena anamórfica de grande escala. | Objeto ou personagem atravessa o limite físico do painel, perspectiva calculada para visão de rua e leitura com pouquíssimo texto. | awareness, lançamento, espetáculo visual |  |
| `/key_visual` | Key visual | Imagem-mãe capaz de sustentar uma campanha. | Criar uma ideia visual central adaptável, com elemento proprietário, sistema de enquadramento e espaço para derivações de formato. | campanha, lançamento, identidade visual |  |

### Composição (8)

| Código | Nome | Intenção | Expansão (texto que entra no prompt) | Melhor para | Conflita |
|:--|:--|:--|:--|:--|:--|
| `/hero_subject` | Sujeito herói | Um elemento domina claramente o quadro. | Sujeito principal ocupa a maior massa visual e todo elemento secundário existe para reforçá-lo. | produto, pessoa, lançamento |  |
| `/negative_space` | Espaço negativo | Reservar área calma para texto e respiração. | Manter de 25 a 40 por cento do quadro visualmente calmo, sem detalhes concorrentes, com contraste adequado para o conteúdo. | copy forte, premium, mobile |  |
| `/split_layout` | Layout dividido | Separar mensagem e visual em duas zonas claras. | Dividir o quadro em dois campos coordenados, um para conteúdo e outro para imagem, com tensão de escala entre eles. | comparação, produto, explicação |  |
| `/editorial_grid` | Grid editorial | Criar ordem sofisticada e ritmo tipográfico. | Usar colunas, alinhamentos e quebras de escala de linguagem editorial, com leitura controlada e respiro generoso. | educativo, premium, manifesto |  |
| `/centered_impact` | Impacto central | Criar leitura frontal e imediata. | Concentrar o elemento dominante no eixo central, com simetria intencional e poucos elementos de apoio. | capa, produto único, anúncio direto | `/asymmetric_flow` |
| `/asymmetric_flow` | Fluxo assimétrico | Criar tensão e percurso visual mais dinâmico. | Distribuir massas de forma assimétrica, com um ponto focal claro e caminho do olhar até mensagem e CTA. | anúncio, pessoa, tecnologia | `/centered_impact` |
| `/data_focus` | Dado em foco | Transformar número ou prova em elemento visual principal. | O dado domina a hierarquia, com contexto curto, sinal visual de leitura e nenhum gráfico decorativo sem função. | prova, case, performance |  |
| `/visual_continuity` | Continuidade visual | Conectar slides ou peças de uma série. | Um elemento, linha, recorte ou massa atravessa a sequência e cria necessidade visual de avançar. | carrossel, série, storyboard |  |

### Direção de arte (6)

| Código | Nome | Intenção | Expansão (texto que entra no prompt) | Melhor para | Conflita |
|:--|:--|:--|:--|:--|:--|
| `/clean_commercial` | Comercial limpo | Comunicação realista, clara e confiável. | Direção publicitária limpa, acabamento profissional, fundo controlado, contraste seguro e ausência de ornamento genérico. | serviços, leads, negócio local |  |
| `/premium_showcase` | Apresentação premium | Elevar percepção de valor. | Poucos elementos, materiais refinados, luz controlada, respiro amplo e acabamento de campanha de alto valor. | luxo, produto, marca premium |  |
| `/bold_brutalist` | Brutalismo comercial | Gerar interrupção forte e atitude. | Tipografia pesada, blocos sólidos, contraste duro, estrutura explícita e imperfeição controlada. | campanha jovem, manifesto, oferta forte |  |
| `/editorial_refined` | Editorial refinado | Misturar autoridade e sensibilidade visual. | Composição de revista, tipografia sofisticada, ritmo de página e imagem com tratamento autoral discreto. | autoridade, conteúdo, marca pessoal |  |
| `/tech_human` | Tecnologia humana | Mostrar tecnologia sem aparência fria ou genérica. | Geometria precisa, dados ou interfaces simplificadas e sinais humanos de calor, contexto e acessibilidade. | SaaS, retail tech, automação |  |
| `/cinematic` | Cinematográfico | Criar atmosfera, profundidade e narrativa visual. | Luz motivada, profundidade em camadas, composição de cena e contraste emocional sem filtros artificiais excessivos. | storytelling, campanha, vídeo |  |

### Fotografia (5)

| Código | Nome | Intenção | Expansão (texto que entra no prompt) | Melhor para | Conflita |
|:--|:--|:--|:--|:--|:--|
| `/human_authority` | Autoridade humana | Usar uma pessoa real como fonte de confiança. | Pessoa aparece com presença, gesto natural e expressão coerente, sem pose de banco de imagem ou embelezamento artificial. | marca pessoal, serviço local, especialista |  |
| `/product_hero` | Produto herói | Dar domínio visual ao produto. | Produto com forma, material e função legíveis, iluminação que revela volume e ausência de props concorrentes. | ecommerce, lançamento, produto físico |  |
| `/real_environment` | Ambiente real | Preservar o local verdadeiro do cliente. | Usar a foto real como base e preservar arquitetura, objetos permanentes e lógica de iluminação do espaço. | negócio local, bastidores, prova |  |
| `/studio_controlled` | Estúdio controlado | Eliminar ruído e controlar luz e materialidade. | Fundo simples, luz principal definida, sombras coerentes e acabamento limpo de estúdio. | retrato, produto, campanha clean | `/real_environment` |
| `/identity_lock` | Preservação de identidade | Manter rosto, produto ou personagem de referência. | Preservar estrutura, proporções, idade, etnia, textura e sinais distintivos, alterando apenas o que foi autorizado. | pessoa real, produto proprietário, personagem |  |

### Emoção (5)

| Código | Nome | Intenção | Expansão (texto que entra no prompt) | Melhor para | Conflita |
|:--|:--|:--|:--|:--|:--|
| `/relief` | Alívio | Mostrar saída possível depois de tensão. | Expressão, luz e composição comunicam redução de peso e retomada de controle, sem euforia artificial. | problema resolvido, serviço, recuperação |  |
| `/urgency` | Urgência | Acelerar decisão sem parecer desespero. | Contraste, direção do olhar e proximidade do CTA criam tempo curto e ação imediata, sem alarmismo falso. | prazo, oferta, retomada |  |
| `/confidence` | Confiança | Transmitir domínio e segurança. | Postura visual estável, contraste claro, poucos elementos e nenhuma hesitação estética ou verbal. | B2B, autoridade, prova |  |
| `/aspiration` | Aspiração | Mostrar um estado desejado crível. | A cena apresenta progresso e possibilidade concreta, sem luxo genérico ou promessa inalcançável. | transformação, carreira, lifestyle |  |
| `/curiosity` | Curiosidade | Abrir uma pergunta visual que pede continuidade. | Ocultar ou interromper uma parte relevante da informação, mantendo pistas suficientes para a audiência querer avançar. | carrossel, teaser, conteúdo educativo |  |

### Narrativa (4)

| Código | Nome | Intenção | Expansão (texto que entra no prompt) | Melhor para | Conflita |
|:--|:--|:--|:--|:--|:--|
| `/problem_solution` | Problema e solução | Conectar dor reconhecida a uma saída específica. | O quadro torna o problema visível e conduz para a solução sem dividir a atenção em duas metáforas independentes. | leads, produto consciente, serviço |  |
| `/before_after` | Antes e depois | Mostrar transformação comparável. | Dois estados claramente equivalentes, com diferença verificável e sem manipulação enganosa. | processo, case, melhoria |  |
| `/proof_first` | Prova primeiro | Abrir a comunicação com evidência. | Dado, demonstração, depoimento autorizado ou elemento real aparece antes da promessa e organiza toda a peça. | B2B, performance, consideração |  |
| `/visual_metaphor` | Metáfora visual | Materializar uma ideia abstrata em uma cena simples. | Usar uma única ação, objeto ou relação espacial concreta como veículo da mensagem, sem metáforas concorrentes. | conceito, educação, campanha |  |

### Marca (4)

| Código | Nome | Intenção | Expansão (texto que entra no prompt) | Melhor para | Conflita |
|:--|:--|:--|:--|:--|:--|
| `/brand_lock` | Trava de marca | Preservar o DNA visual do cliente. | Usar apenas paleta, tipografia, tratamentos e restrições confirmados no perfil do cliente. Em conflito, a marca vence. | todo trabalho de cliente |  |
| `/logo_safezone` | Área segura de logo | Evitar reconstrução incorreta do logo. | Reservar uma área limpa e uniforme para aplicar o logo oficial depois. Não desenhar, digitar ou reinterpretar a marca. | anúncio, post, campanha |  |
| `/type_hierarchy` | Hierarquia tipográfica | Garantir ordem clara de leitura. | Definir H1, apoio e CTA com salto perceptível de tamanho, peso e cor, usando no máximo três níveis. | peça com texto, mobile, conversão |  |
| `/literal_copy` | Copy literal | Preservar texto aprovado sem alterações. | Reproduzir exatamente a copy fornecida, com acentuação e pontuação. Se o motor não garantir fidelidade, reservar a zona para composição posterior. | copy aprovada, oferta, compliance |  |

## 5. Ordem de montagem do prompt

O molde curto e o motor estão em `totum-design-peca`. Ordem do texto colado: objetivo, link do design system, referência, copy literal, Visual Codes (3 a 4), negativos, ajuste manual. Sem direção de layout.

## 6. Proveniência

- `totum-house/totum-design-os/data/visual-codes.json` = `totum-house/totum-designer-workspace/Sistema/Visual-Codes-MVP/visual-codes.json` (conferido byte a byte no conteúdo).
- MD do ChatGPT (`Biblioteca Visual Totum completa`, exportação 23/10/2026): mesmos 40 códigos, textos idênticos.
