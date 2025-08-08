<!-- components/GameTable.vue -->
<template>
    <div class="overflow-x-auto rounded-lg font-spartan  shadow-md">
        <table class="min-w-full text-sm text-left border border-gray-300">
            <thead class="bg-blue-300 text-white text-lg">
                <tr>
                    <th class="p-4 text-center w-24">
                        <input type="checkbox" class="w-4 h-4" />
                    </th>
                    <th class="p-4 w-48 text-center">ID</th>
                    <th class="p-4 min-w-[150px] text-center">Name</th>
                    <th class="p-4 min-w-[120px] text-center">Category</th>
                </tr>
            </thead>
            <tbody class="text-lg">
                <tr v-for="(game, index) in paginatedGames" :key="game.id" :class="[
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                    'hover:bg-gray-100 transition-colors duration-200'
                ]">
                    <td class="p-3 text-center">
                        <input type="checkbox" v-model="game.checked" />
                    </td>
                    <td class="p-3 font-bold text-blue-700 text-center cursor-pointer" @click="$emit('edit', game)">
                        {{ game.id }}
                        <span>
                            <FontAwesomeIcon :icon="['fas', 'up-right-from-square']" />
                        </span>
                    </td>


                    <td class="p-3 text-gray-900 text-center">
                        {{ getName(game.name) }}
                    </td>
                    <td class="p-3 text-gray-700 text-center">
                        {{ game.category }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="flex justify-center items-center space-x-2 mt-10 font-spartan ">
        <button class="px-3 py-1 shadow-lg rounded border disabled:opacity-50 bg-black text-white"
            :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
            Previous
        </button>
        <button v-for="page in totalPages" :key="page" class="px-3 py-1 border rounded-xl" :class="{
            'bg-blue-500 text-white': page === currentPage,
            'bg-white text-black': page !== currentPage
        }" @click="goToPage(page)">
            {{ page }}
        </button>
        <button class="px-3 py-1 border rounded disabled:opacity-50 bg-black text-white"
            :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
            Next
        </button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
    games: {
        type: Array,
        default: () => []
    }
})

const currentPage = ref(1)
const pageSize = 3

const paginatedGames = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return props.games.slice(start, start + pageSize)
})

const totalPages = computed(() => Math.ceil(props.games.length / pageSize))

function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    }
}

// Lấy tên tiếng Anh mặc định
function getName(nameArr) {
    const en = nameArr?.find(n => n.language === 'EN')
    return en?.value || 'N/A'
}
</script>