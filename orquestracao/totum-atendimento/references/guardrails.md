# Guardrails

Regras que valem para todos os nichos, e a tabela de revalidação. Regras por nicho moram em cada arquivo `nicho-*.md`.

**Legenda de confiança.** [A] fonte oficial. [B] fonte secundária séria. [C] fornecedor ou blog comercial. [H] hipótese a validar.

**Regra de ouro.** Se a regra mudou, o script antigo fica marcado como "revisar" até alguém reler a norma. Esta skill é redação, não parecer jurídico. Em saúde, valide com advogado ou conselho antes de automatizar.

## 1. LGPD (vale para os quatro nichos)

- [B] Dado de saúde é sensível. Atendimento assistencial pode se apoiar na base legal de tutela da saúde. Marketing por WhatsApp ou e-mail, pesquisa de satisfação ligada a dado de saúde e uso de imagem do paciente em rede social exigem consentimento específico.
- Peça consentimento claro antes de reativação e lista de transmissão. Ofereça saída fácil ("responda SAIR"). Pedido de saída para a conversa na hora.
- Nunca compartilhe dado de uma pessoa com outra (marido, mãe, colega) sem autorização dela.

## 2. WhatsApp

- [B/C] Não coloque diagnóstico, medicamento ou resultado de exame no corpo da mensagem. Direcione para ligação ou consulta.
- [C] Use número institucional (WhatsApp Business no CNPJ), não o celular pessoal da recepcionista. Fonte comercial, use com cautela.
- [B] Desde 15/01/2026 a Meta proíbe chatbots de IA de uso geral (estilo ChatGPT) na API do WhatsApp Business. Bot de atendimento de uma empresa sobre o próprio negócio segue permitido. Houve exceção para o Brasil e intervenção do Cade. Bot específico do cliente, com caminho para humano, fica do lado seguro.
- O link `wa.me` não protege de bloqueio. O que pesa é a reação de quem recebe.
- Mensagem sem consentimento para base fria aumenta risco de bloqueio e de denúncia. Priorize lead que chamou primeiro.

## 3. IA em saúde

- [A] Resolução CFM 2.454/2026 (publicada em 27/02/2026, em vigor desde 26/08/2026): IA é só apoio. É vedado delegar à IA a comunicação de diagnóstico, prognóstico ou decisão terapêutica sem mediação humana. O paciente tem direito de ser informado quando a IA for apoio relevante no cuidado.
- [H] Bot de agenda e confirmação provavelmente é de risco baixo, mas é leitura minha. Fluxo que responda dúvida clínica, interprete foto de lesão ou entregue resultado exige humano na ponta. Validar com advogado antes de automatizar com IA em clínica.

## 4. Tabela de escalada para humano

| Gatilho | Quem assume | Quando |
|---|---|---|
| Dúvida clínica, foto de lesão, efeito colateral | Profissional de saúde | Na hora |
| Resultado de exame, laudo, receita, atestado | Profissional ou recepção treinada, por ligação | Na hora |
| Intercorrência pós-procedimento | Profissional | Imediato, ligação |
| Reclamação, ameaça de Procon, de processo ou de avaliação ruim | Gestor do cliente | Em até 1 hora útil |
| Cancelamento ou pedido de reembolso | Humano com poder de decisão | Mesmo dia |
| Menor de idade como interlocutor | Responsável legal | Antes de qualquer dado |
| Emoção forte (choro, raiva, medo extremo) | Humano | Na hora |
| Cliente pede humano | Humano | Na hora, sem insistir no bot |

## 5. Regras de redação que o nicho muda

- Em saúde, prometa processo ("avaliação", "plano", "acompanhamento"), nunca desfecho ("cura", "resultado garantido", "sem dor").
- Nada de "o melhor da cidade", "melhor da região", "garantido", "100%".
- Superlativo e comparação com concorrente: evite.
- Preço: regra muda por nicho. Veja o arquivo do nicho antes de escrever qualquer valor.

## 6. Pendências para validar e quando revalidar

Verificado em 09/11/2026.

| Item | O que fazer | Revalidar |
|---|---|---|
| ADI 7.978 (STF, Res. Contran 1.020/2025) | Conferir andamento no portal do STF | Mensal |
| Novo Código de Ética Odontológica do CFO | Conferir publicação | Mensal |
| Detran-MG: implantação da 1.020 e credenciamento de instrutor autônomo | Pesquisar fontes locais | Antes do kit de autoescola |
| CFM 2.336/2023: preço de procedimentos e promoção | Ler o texto da norma | Antes do kit de dermato |
| CFM 2.454/2026: bot de agenda em clínica | Parecer jurídico | Antes de automatizar com IA |
| CDC e multa de cancelamento em curso | Jurídico do cliente | Antes do kit de cursos |
| Preço em conversa individual (odonto) | Consultar o CRO do estado | Antes do kit de odonto |
| Classificação livre ou técnico de cada curso | Perguntar ao cliente | Antes do kit de cursos |

## 7. Fontes descartadas (não usar como prova)

- Agilize afirma que a CFM 2.454/2026 proíbe "antes e depois". Falso. A 2.454/2026 trata de IA. O "antes e depois" é regido pela 2.336/2023.
- "Conversão de 25,33% em dermatologia" (Agilize), sem fonte.
- DMA Digital: clínica odontológica pode divulgar preço. Contradiz o Código de Ética.
- PROMultas: liminar do STF "concedida e derrubada". Não confirmado em fonte oficial.
- Percentuais de ganho de conversão de blogs de software de WhatsApp.
- Estudos de faltas de fora do Brasil: só hipótese de desenho.
