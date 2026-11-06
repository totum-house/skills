---
name: totum-sdr-wa-link
description: Use quando for montar ou rodar um lote de abordagem SDR por WhatsApp usando links wa.me/api.whatsapp.com gerados por planilha, com envio manual um a um (técnica sem custo de API), a partir de uma base de leads do uPixel CRM ou CSV.
---

# Totum SDR via link wa.me

Técnica de SDR assistido: uma planilha gera um link `wa.me` por contato com nome e mensagem já preenchidos. A pessoa (ou o agente no navegador) clica, o WhatsApp abre com o texto pronto e alguém aperta enviar, um contato por vez. Não passa pela API, então não tem custo por mensagem. Origem: técnica do Naim Araújo (@programando_com_planilhas), validada pelo Rael em out/2026 para uso com a base do uPixel.

## A verdade sobre "não bloqueia"

O link em si é permitido e grátis, mas NÃO protege de bloqueio. Para o WhatsApp é o mesmo que abordagem fria feita à mão: o que pesa é comportamento e reação de quem recebe, não como a mensagem foi digitada. Não existe limite diário oficial; os números abaixo são relato de mercado, tratados como teto conservador, não como garantia. Nunca prometer "não bloqueia".

## Regras duras (Rael)

- Chip dedicado com WhatsApp Business, NUNCA o número pessoal principal. No comum o ban costuma vir sem aviso e leva número, backups, grupos e histórico.
- Nenhuma mensagem sai para lead real sem o Rael aprovar a lista e os textos antes.
- Envio manual (clique humano ou agente no WhatsApp Web). Extensão/script que aperta enviar sozinho é automação proibida e fora deste método.
- Sem link na primeira mensagem. Abertura termina em pergunta ou afirmação que puxa resposta.
- Pedido de saída fácil: se o lead pedir para parar, para na hora e registra opt-out.
- Verdade: nunca afirmar dado do lead (nota no Google, "vi uma coisa") sem ter conferido lead por lead.

## Fluxo

1. **Base.** uPixel CRM (https://totum.upixel.app/): as listas ficam nos funis (clicar no nome do funil > "Seus Funis"); cada coluna exporta CSV pelo menu "...". Não há exportação da base inteira. Ou usar CSV fornecido. Separar celulares de fixos; fixo só entra se tiver Business (testar um a um, por último). Celular antigo de 8 dígitos: acrescentar o 9.
2. **Normalizar telefones.** Formato internacional só dígitos: `55` + DDD + número, sem `+`, espaços ou traços. Ex.: `5511987654321`.
3. **Script.** Abertura personalizada com um dado real do lead, opção de saída, 2 follow-ups, respostas às 3 objeções principais e o passo de fechamento (reunião/ligação). Mensagem termina em pergunta; aguardar resposta; a IA decide seguir, corrigir caminho ou pular bloco ao objetivo.
4. **Planilha.** Colunas: nome, telefone_normalizado, mensagem, link. Fórmula do link:
   `="https://wa.me/"&[telefone]&"?text="&ENCODEURL([mensagem])`
   (Apps Script: `encodeURIComponent(mensagem)`.) Um link por linha. Gerar arquivo e conferir 2 ou 3 links abrindo com o texto certo antes do lote.
5. **Aprovação.** Mostrar ao Rael a lista (quantos, segmento, celulares) e as mensagens. Só prosseguir com o OK dele.
6. **Envio.** WhatsApp Web no navegador logado no chip Business. Abrir cada link, EDITAR um pedaço da mensagem antes de enviar (o link entrega texto sem "digitando", e edição ajuda), enviar, esperar alguns minutos aleatórios entre contatos. Janela 9h–18h.
7. **Volume e ritmo (relato, conservador).** Chip novo: aquecer ~15 dias; começar com 5 conversas novas/dia e subir até 10–20. Número maduro: 40–80/dia. Se 2 bloqueios no mesmo dia: pausar 48h. Existe teto mensal de mensagens sem resposta desde out/2025 (não divulgado no BR; Índia ~1.000/mês): prospecção fria consome esse teto, então priorizar lead qualificado.
8. **Continuação.** O disparo inicial é manual; a conversa segue no agente (JEV na VPS) ou com a IA sugerindo resposta no app. Log de cada resposta com a decisão da IA (seguiu/corrigiu/pulou). Ligação (~1h/dia) só para quem respondeu bem: WhatsApp aquece, ligação converte.

## Meta de teste

30 leads por projeto/oferta, meta ≥30% de resposta e 2 reuniões. Testar uma oferta por vez.

## Limites e escala

- O lead que chama primeiro por anúncio de clique para WhatsApp ou botão da página do Facebook fica grátis por até 7 dias na API e é o caminho de escala; wa.me NÃO entra nessa exceção.
- Conexão WhatsApp do uPixel (QR/Evolution API) estava fora do ar em out/2026; conserto só com OK do Rael. Até lá o funil serve como base de leads e registro, não como disparador.
- Não pagar API nem curso para essa técnica: o método aqui é 100% gratuito.
