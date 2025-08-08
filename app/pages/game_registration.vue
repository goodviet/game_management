<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import DropDowns from '@/components/DropDowns.vue'
import { useGameStore } from '@/composables/useGameStore'

const route = useRoute()
const { categories, selectedCategory } = useGameStore()

const gameId = ref('')
const languages = ref([
  { code: 'en', label: 'English', value: '' },
  { code: 'ko', label: 'Korean', value: '' }
])

onMounted(() => {
  const mode = route.query.mode
  const data = route.query.data

  if (mode === 'edit' && data) {
    const decoded = JSON.parse(decodeURIComponent(data))

    gameId.value = decoded.id
    selectedCategory.value = decoded.category

    // Parse ngôn ngữ nếu có
    if (decoded.name && Array.isArray(decoded.name)) {
      languages.value = decoded.name.map(lang => ({
        code: lang.language.toLowerCase(),
        label: languageLabel(lang.language),
        value: lang.value
      }))
    }
  }
})

function languageLabel(code) {
  const map = {
    en: 'English',
    ko: 'Korean',
    vi: 'Vietnamese',
    jp: 'Japanese'
  }
  return map[code.toLowerCase()] || code.toUpperCase()
}
const showAddLanguagePopup = ref(false)
const selectedLanguageToAdd = ref('')

// Danh sách ngôn ngữ gốc để chọn từ đây
const allAvailableLanguages = [
  { code: 'ko', label: 'Korean' },
  { code: 'en', label: 'English' },
  { code: 'jp', label: 'Japanese' }
]

// Danh sách ngôn ngữ chưa có (computed)
const filteredAvailableLanguages = computed(() => {
  const existingCodes = languages.value.map(l => l.code)
  return allAvailableLanguages.filter(lang => !existingCodes.includes(lang.code))
})

// Hàm thêm ngôn ngữ mới
function addLanguage() {
  if (!selectedLanguageToAdd.value) return

  const alreadyExists = languages.value.some(
    (lang) => lang.code === selectedLanguageToAdd.value
  )

  if (!alreadyExists) {
    const newLang = allAvailableLanguages.find(
      (lang) => lang.code === selectedLanguageToAdd.value
    )

    if (newLang) {
      languages.value.push({
        code: newLang.code,
        label: newLang.label,
        value: ''
      })
    }
  }

  selectedLanguageToAdd.value = ''
  showAddLanguagePopup.value = false
}

function registerGame() {
  const dataToSave = {
    id: gameId.value,
    category: selectedCategory.value,
    name: languages.value.map(lang => ({
      language: lang.code,
      value: lang.value
    }))
  }

  // Gửi về store hoặc API
  console.log('Dữ liệu gửi:', dataToSave)

  // Bạn có thể gọi useGameStore().updateGame(dataToSave) nếu cần
}


</script>

<template>
  <div class="p-4 md:p-10 bg-white min-h-screen">
    <!-- Title -->
    <p class="text-2xl md:text-4xl font-spartan font-bold mb-6">Game Register / Edit</p>

    <!-- Category -->
    <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-6">
      <label class="md:w-[120px] font-spartan font-bold">Category</label>
      <DropDowns :categories="categories" v-model:selected="selectedCategory" />

    </div>

    <!-- Game ID -->
    <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-6">
      <label class="md:w-[120px] font-spartan font-bold">ID</label>
      <input type="text" v-model="gameId"
        class="bg-white h-10 w-full md:w-56 p-2 text-black rounded border border-gray-300" />

    </div>

    <!-- Multi Language Info -->
    <div class="mt-10 space-y-4">
      <p class="font-spartan text-xl font-bold">Multi Language Info</p>

      <!-- Language Row -->
      <div
        class="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 border border-slate-200 shadow-lg rounded-lg bg-blue-300 p-4">
        <p class="md:w-1/5 text-white font-spartan font-bold">Input by Language</p>
        <div class="flex items-center gap-2">
          <input type="checkbox" />
          <p class="text-white font-spartan">Default Language</p>
        </div>
        <button class="flex items-center text-white font-spartan hover:cursor-pointer">
          <font-awesome-icon :icon="['fas', 'trash']" class="text-red-500 mr-2" />
          Delete Language
        </button>
      </div>
    </div>

    <!-- Language Inputs -->
    <div class="flex flex-col md:flex-row mt-10 font-spartan gap-6">
      <!-- Labels -->
      <div class="md:w-1/5 space-y-6">
        <div v-for="lang in languages" :key="lang.code">
          <p class="font-bold">{{ lang.label }}</p>
        </div>
        <button class="bg-orange-500 p-2 rounded-lg text-white shadow-lg cursor-pointer hover:bg-orange-600"
          @click="showAddLanguagePopup = true">
          <span class="mr-2">+</span>Add Language
        </button>
      </div>

      <!-- Inputs -->
      <div class="w-full space-y-5">
        <label>Name</label>
        <div v-for="lang in languages" :key="lang.code">
          <input type="text" v-model="lang.value"
            class="bg-white h-10 w-full md:w-56 p-2 text-black rounded border border-gray-300" />
        </div>

      </div>
    </div>


    <!-- Add Language Popup -->
    <div v-if="showAddLanguagePopup" class="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
      <div class="bg-white border p-6 rounded-lg shadow-xl w-[90%] max-w-sm">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-bold">Add Language</h2>
          <button class="text-red-500 text-xl" @click="showAddLanguagePopup = false">×</button>
        </div>
        <select v-model="selectedLanguageToAdd" class="w-full border p-2 rounded mb-4">
          <option value="">-- Select Language --</option>
          <option v-for="lang in filteredAvailableLanguages" :key="lang.code" :value="lang.code">
            {{ lang.label }}
          </option>
        </select>
        <button @click="addLanguage" class="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          + Add
        </button>
      </div>
    </div>


    <!-- Buttons -->
    <div class="flex flex-col sm:flex-row justify-end gap-4 mt-10">
      <CustomButton  @click="$router.push('/game_list')"  class="bg-red-500" :label="'Return To List Page'" :icon="['fas', 'arrow-left']"
        icon-position="left" />
      <CustomButton class="bg-teal-500" :label="'Register / Edit'" :icon="['fas', 'plus']" icon-position="left"
        @click="registerGame" />

    </div>
  </div>
</template>
