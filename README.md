# 🕹️ Games Management App

A simple game management system built with **Nuxt 3**, **Tailwind CSS**, and **PrimeVue**.  
The app allows users to manage games with multilingual names and perform CRUD operations on local JSON data.

![Skills](https://skillicons.dev/icons?i=nuxtjs,js,ts,tailwind&theme=light)

---

## 📋 Features

- 🔎 Filter game list by **category** and **keyword**
- 📝 Add or edit game info with:
  - Game ID
  - Game Category
  - Multilingual names (EN, KO, JA)
- ➕ Add / 🗑️ Delete / ⭐ Set default language entries
- ✅ Validate form before submitting
- 📦 Uses local JSON (`/public/data/data.json`) to simulate data source

---

## ⚙️ Prerequisites

Make sure your local environment has:
- [Node.js](https://nodejs.org/) installed
- [Bun](https://bun.sh/) package manager installed (`npm i -g bun`)

---

## 🚀 Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/games-management-app.git
cd games

```sh
 bun install
```
Start the development server:

```sh
bun run dev
```

🗂 Folder Structure
```
    games/
    ├── components/
    │   ├── Table.vue
    │   ├── DropDowns.vue
    │   └── CustomButton.vue
    ├── composables/
    │   └── useGameStore.js
    ├── pages/
    │   ├── game-list.vue
    │   └── game-registration.vue
    ├── public/
    │   └── data/
    │       └── data.json
    ├── app.vue
    ├── nuxt.config.ts
    └── README.md
```

📚 References
Nuxt 3 Docs

Tailwind CSS

PrimeVue

FontAwesome Vue

Bun Documentation