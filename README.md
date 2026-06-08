PokeApp

---


**PokeApp** — uma Pokédex digital desenvolvida com React Native e Expo por Artur Henrique Cruz da Silva e Pietro Maia Fernandes.



É um aplicativo mobile que permite explorar o universo Pokémon de forma rápida e intuitiva. O app consome dados em tempo real da PokeAPI, exibindo informações detalhadas sobre cada Pokémon, como tipos, estatísticas base, habilidades, peso e altura.


Funcionalidades Principais

- 📖 Listagem paginada de todos os Pokémons com scroll infinito
- 🔍 Busca por nome ou número do Pokémon
- 📊 Tela de detalhes com imagem oficial, tipos, estatísticas base, habilidades, altura e peso
- ❤️ Sistema de favoritos — adicione e remova Pokémons favoritos com badge no menu
- 🌙 Alternância entre tema claro e escuro (Dark/Light mode)
- ⚠️ Tratamento de erros com loading states e opção de retry

---

API Utilizada

**PokeAPI v2**
📄 Documentação: [https://pokeapi.co/docs/v2](https://pokeapi.co/docs/v2)

API pública, gratuita e sem necessidade de autenticação.

Endpoints utilizados:
- `GET /pokemon?limit={n}&offset={n}` — listagem paginada
- `GET /pokemon/{id ou nome}` — detalhes de um Pokémon



Instruções de Execução

### Pré-requisitos
- [Node.js](https://nodejs.org/) v18 ou superior
- Aplicativo **Expo Go** instalado no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/pokedex-app.git

# 2. Entre na pasta do projeto
cd pokedex-app

# 3. Instale as dependências
npm install --legacy-peer-deps

# 4. Inicie o servidor de desenvolvimento
npx expo start --clear
```

Após iniciar, escaneie o QR Code com o **Expo Go** no celular.


---

## 6. Telas do Aplicativo

### 📱 Tela 1 — Pokédex (Listagem)
Tela principal do app. Exibe todos os Pokémons em grade de 2 colunas com scroll infinito. Possui barra de busca para encontrar um Pokémon pelo nome ou número. Ao tocar em um card, o usuário é levado para a tela de detalhes.

<img width="418" height="845" alt="image" src="https://github.com/user-attachments/assets/10667611-f265-44ad-aa33-9f4c65f68a62" />


---

### 📱 Tela 2 — Detalhes do Pokémon
Tela acessada ao clicar em um Pokémon. Recebe o ID e nome como parâmetros da rota (Stack Navigation). Exibe imagem oficial em alta resolução, tipos com cores temáticas, estatísticas base com barras visuais, habilidades, altura e peso. Possui botão de favoritar (♥) no canto superior direito.


<img width="418" height="846" alt="image" src="https://github.com/user-attachments/assets/6863f17c-06d8-4f3a-b758-b86cee5c28e0" />


### 📱 Tela 3 — Favoritos
Lista todos os Pokémons marcados como favoritos pelo usuário. Os dados são gerenciados globalmente via Context API + useReducer. Caso não haja favoritos, exibe mensagem de estado vazio.

<img width="418" height="853" alt="image" src="https://github.com/user-attachments/assets/50080fb0-dcd7-4e20-af92-3d7ca5f01d4a" />



### 📱 Tela 4 — Configurações
Permite alternar entre tema claro e escuro (Dark/Light mode), exibe estatísticas do app (total de favoritos, Pokémons e tipos disponíveis) e links para a documentação da API e repositório do projeto.


<img width="415" height="855" alt="image" src="https://github.com/user-attachments/assets/bfbd7029-26ac-4c32-b472-24bd2a2f2843" />


 Requisitos Técnicos Implementados

| Requisito | Implementação |
|---|---|
| **Consumo de API** | PokeAPI via `axios` com loading, erro e retry |
| **Stack Navigation** | Fluxo Listagem → Detalhes com passagem de `pokemonId` e `pokemonName` |
| **Tab Navigation** | Menu inferior com 3 abas: Pokédex, Favoritos e Configurações |
| **useState** | Controla lista, busca, loading, erro e paginação |
| **useEffect** | Dispara a API na inicialização do componente |
| **useReducer** | Gerencia o estado de favoritos (`ADD`, `REMOVE`, `CLEAR`) |
| **Context API** | `ThemeContext` (tema global) + `FavoritesContext` (favoritos globais) |

---

## 🛠️ Tecnologias Utilizadas

- React Native + Expo
- TypeScript
- React Navigation (Stack + Bottom Tabs)
- Axios
- Context API + useReducer
- @expo/vector-icons (Ionicons)
