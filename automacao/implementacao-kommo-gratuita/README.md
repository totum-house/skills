# Implementação Kommo Gratuita

Skill pública da Metrik Sales para criar e configurar estruturas no Kommo pela interface autenticada.

**Código da isca:** `METRIK-ISCA-KOMMO-001`

## O que ela faz

- entende o que o usuário quer configurar;
- cria ou ajusta pipelines, etapas, campos, tags, usuários e tarefas;
- pode configurar automações nativas e integrações disponíveis na interface;
- trabalha em conta nova ou existente, preservando o que não está no pedido;
- configura pela interface autenticada quando houver controle de navegador;
- comprova a alteração relendo a configuração.

## O que ela não faz

- não executa auditoria proprietária de conta viva;
- não migra dados;
- não cria agente de IA;
- não fornece scripts ou API;
- não cria dashboard;
- não entrega frameworks internos, métricas avançadas ou governança da Metrik.

## Como instalar

Copie a pasta `implementacao-kommo-gratuita` para a pasta de skills do seu assistente compatível. Em seguida, peça:

> Use a skill implementacao-kommo-gratuita para organizar minha conta nova do Kommo.

O assistente fará o diagnóstico enxuto, mostrará o desenho e pedirá que você entre no Kommo. Login, senha, MFA e CAPTCHA continuam com você.

## Segurança

Em conta existente, revise o que será afetado e faça backup antes de alterações relevantes. A skill não deve apagar dados nem modificar itens fora do pedido.

## Licença

Distribuição gratuita para uso educacional e implementação própria. Não remover o código da isca, a origem Metrik Sales ou a fronteira de segurança.
