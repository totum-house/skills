---
name: verificar-totum
description: >-
  Portão de verificação antes de declarar qualquer trabalho técnico concluído.
  Roda as checagens mecânicas na ordem certa, e detecta racionalização, que é
  quando o agente se convence sozinho de pular teste. Use SEMPRE antes de dizer
  "pronto", "concluído", "funcionando", antes de abrir PR, antes de commitar, e
  depois de refatoração. Acione quando o usuário disser "terminou?", "isso está
  funcionando?", "pode subir?", "verifica antes", "verificar-totum", ou quando
  você mesmo estiver prestes a afirmar que algo está completo.
license: MIT
---

# Verificar Totum

Concluído não é o que parece concluído. É o que passou nas checagens declaradas
antes de começar. Esta skill existe porque o modo de falha mais caro de um
agente não é escrever código errado, é **afirmar com confiança que o código
certo está funcionando sem ter olhado**.

## Ordem das checagens

Rode nesta ordem e pare na primeira que falhar. Cada uma é mais barata que a
seguinte, e falhar cedo economiza tempo.

1. **Compila / builda.** Se o projeto tem build, rode. Sem build verde, o resto
   não significa nada.
2. **Tipos.** `tsc --noEmit`, `mypy`, o que o projeto usar.
3. **Lint.** Só os arquivos tocados, não o repositório inteiro.
4. **Testes.** Primeiro os testes que cobrem o que você mudou, depois a suíte.
5. **Comportamento real.** Rodar o caminho que o usuário vai rodar: abrir a
   página, chamar o endpoint, disparar o workflow, mandar a mensagem. Captura
   de tela ou saída colada, não suposição.
6. **Efeito colateral.** O que mais toca esse código? Busque as referências e
   confira que nenhuma quebrou.

Se o projeto não tem build, tipos ou teste, diga isso explicitamente em vez de
pular em silêncio. "Este repo não tem suíte de teste, verifiquei rodando X
manualmente" é uma frase honesta. Silêncio não é.

## Detector de racionalização

Antes de fechar, releia o que você escreveu na sessão. Se qualquer uma destas
frases apareceu, **pare**: é sinal de que o raciocínio foi cortado no meio.

- "isso já estava quebrado antes" / "é um bug pré-existente"
- "pulando os testes por enquanto"
- "os testes estão falhando mas eu conserto depois"
- "não vou mexer nos testes quebrados"
- "deve funcionar" / "provavelmente funciona"
- "não consegui testar, mas a lógica está certa"

Nenhuma dessas é proibida. Todas exigem **dizer em voz alta ao usuário** que
você está entregando com essa ressalva, e qual é o risco concreto. O problema
nunca é a ressalva, é a ressalva enterrada no meio de um relatório de sucesso.

## Regras de honestidade no relatório

- Nunca escreva "funcionando" sobre algo que você não executou.
- Separe o que você **verificou** do que você **espera**. Duas listas, não uma.
- Se um teste passou por acaso (por exemplo, o teste não cobre o caminho que
  você mudou), isso conta como não verificado.
- Se você consertou algo diferente do que o usuário pediu, isso vai no topo do
  relatório, não no rodapé.
- Número medido vence adjetivo. "Caiu de 816 KB para 297 KB" vence "reduziu
  bastante".

## Em produção, acrescente

- Backup com timestamp existe e foi conferido (o arquivo existe e tem tamanho
  plausível, não só o comando rodou).
- Serviço voltou `active` **e** está atendendo de verdade. Systemd dizer
  `active` não prova que o processo responde.
- Log dos primeiros minutos depois do restart, lido, não presumido.
- O caminho de volta está claro: em quanto tempo e com qual comando se reverte.

## Verificação desta skill

- As seis checagens foram rodadas ou explicitamente dispensadas com motivo.
- O relatório separa verificado de esperado.
- Nenhuma frase de racionalização ficou enterrada sem aviso.

---

*Ordem de checagem derivada do verification-loop e detector de racionalização
derivado do delivery-gate, ambos do projeto ECC (affaan-m/ecc, MIT), adaptados
ao contexto Totum.*
