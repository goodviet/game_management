<script setup>
import { useRouter } from 'vue-router'
import { useGameStore } from '@/composables/useGameStore'
import DropDowns from '@/components/DropDowns.vue'

const router = useRouter()

const {
  gameList,
  selectedCategory,
  keyword,
  categories,
  filteredGames,
  deleteSelected
} = useGameStore()

function editGame(game) {
  const encodedGame = encodeURIComponent(JSON.stringify(game))
  router.push(`/game_registration?mode=edit&data=${encodedGame}`)
}

function createNewGame() {
  router.push('/game_registration?mode=create')
}
</script>

<template>
  <div class="min-h-screen w-full overflow-x-hidden p-4 md:p-10 bg-white">
    <h3 class="text-2xl md:text-4xl font-spartan font-bold">Game Management</h3>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 mt-8">
      <DropDowns :categories="categories" v-model:selected="selectedCategory" />

      <div class="w-full md:w-[400px] h-10 flex items-center border border-gray-300 rounded-lg px-4">
        <input
          type="text"
          placeholder="Keyword"
          v-model="keyword"
          class="w-full h-full font-spartan text-black border-none outline-none"
        />
      </div>

      <button
        class="h-10 px-6 bg-orange-500 text-white rounded-full font-spartan hover:bg-orange-600 transition"
      >
        <font-awesome-icon :icon="['fas', 'search']" />
        <span class="hidden sm:inline ml-2">Search</span>
      </button>
    </div>

    <!-- Game List Header -->
    <div class="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <p class="text-xl md:text-2xl font-spartan font-bold">Game List</p>

      <div class="flex flex-col sm:flex-row gap-4">
        <CustomButton
          class="bg-red-500 hover:bg-red-600"
          :label="'Delete Selected'"
          :icon="['fas', 'trash']"
          icon-position="left"
          @click="deleteSelected"
        />

        <CustomButton
          class="bg-teal-500 hover:bg-teal-600"
          :label="'Register New Game'"
          :icon="['fas', 'plus']"
          icon-position="left"
          @click="createNewGame"
        />
      </div>
    </div>

    <!-- Game Table -->
    <div class="mt-10 overflow-x-auto">
      <Table :games="filteredGames" @edit="editGame" />
    </div>
  </div>
</template>
