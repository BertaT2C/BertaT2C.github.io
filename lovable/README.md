# Portfólio interativo — código exportado do Lovable

Esta aplicação utiliza **React, TypeScript, TanStack Start e Tailwind CSS**. Seu código está na pasta `lovable/` do repositório. O portfólio HTML publicado em `https://bertat2c.github.io/` continua na raiz, na branch `main`.

## Como continuar sem créditos do Lovable

O projeto pode ser editado diretamente no GitHub ou em um editor como VS Code. As principais partes estão em:

- `src/components/portfolio/Hero.tsx` — capa e painel inicial.
- `src/components/portfolio/Header.tsx` — menu.
- `src/components/portfolio/Contact.tsx` — contatos e WhatsApp flutuante.
- `src/components/portfolio/Projects.tsx` — apresentação dos cases.
- `src/data/projects.ts` — textos, indicadores e links dos cases.
- `src/styles.css` — cores, fontes e animações.

## Executar no computador

É necessário instalar o Bun e usar um terminal:

```bash
cd lovable
bun install --frozen-lockfile
bun run dev
```

O endereço local de visualização aparece no terminal.

Para validar manualmente:

```bash
bun run test
bun run build
```

## Verificação automática no GitHub

A workflow `.github/workflows/lovable-validacao.yml` executa instalação, testes e compilação em alterações da branch `Capa-Interativa-(lovable)`. Confira o resultado na aba **Actions**. A workflow **não publica o site**.

## Publicação: atenção à arquitetura

Este código utiliza **TanStack Start**, que inclui recursos de servidor. O GitHub Pages hospeda conteúdo estático; não se deve substituir diretamente o `index.html` publicado pelos arquivos `.tsx`.

Para atualizar a capa do endereço atual sem riscos, existem dois caminhos:
1. **Adaptação visual**: portar a capa para o `index.html` existente, preservando as páginas HTML.
2. **Migração planejada**: configurar uma versão estática compatível com o GitHub Pages, ou hospedar o React em uma plataforma compatível com o modo de execução escolhido.

**Não faça merge na `main` antes de revisar o resultado.**
