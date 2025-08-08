// composables/useGameStore.js
import { ref, computed, onMounted } from 'vue'

const gameList = ref([])
const selectedCategory = ref('')
const keyword = ref('')

export function useGameStore() {
  onMounted(async () => {
    const res = await fetch('/data/data.json')
    const data = await res.json()
    gameList.value = data.map(g => ({ ...g, checked: false }))
  })

  const categories = computed(() => {
    const unique = new Set(gameList.value.map(g => g.category))
    return Array.from(unique)
  })

  const filteredGames = computed(() => {
    return gameList.value.filter(game => {
      const matchesCategory = selectedCategory.value
        ? game.category === selectedCategory.value
        : true
      const keywordLower = keyword.value.toLowerCase()
      const matchesKeyword = game.name.some(n =>
        n.value.toLowerCase().includes(keywordLower)
      )
      return matchesCategory && matchesKeyword
    })
  })

  function deleteSelected() {
    gameList.value = gameList.value.filter(g => !g.checked)
  }

  function addGame(newGame) {
    const exists = gameList.value.some(g => g.id === newGame.id)
    if (!exists) {
      gameList.value.push({ ...newGame, checked: false })
    } else {
      console.warn(`Game with ID ${newGame.id} already exists.`)
    }
  }

  function updateGame(updatedGame) {
    const index = gameList.value.findIndex(g => g.id === updatedGame.id)
    if (index !== -1) {
      gameList.value[index] = { ...updatedGame, checked: false }
    } else {
      console.warn(`Game with ID ${updatedGame.id} not found.`)
    }
  }

  return {
    gameList,
    selectedCategory,
    keyword,
    categories,
    filteredGames,
    deleteSelected,
    addGame,
    updateGame
  }
}
