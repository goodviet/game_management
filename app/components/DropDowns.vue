<script setup>
import { ref, watch } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  }
})

const selected = ref('')

// emit sự kiện khi chọn category
const emit = defineEmits(['update:selected'])

function selectCategory(category) {
  selected.value = category
  emit('update:selected', category)
}
</script>

<template>
  <Menu as="div" class="relative inline-block text-left w-56">
    <div>
      <MenuButton
        class="inline-flex w-full justify-between rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50">
        <span class="truncate font-spartan ">{{ selected || 'Select Category' }}</span>
        <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <div class="py-1">
          <MenuItem class="font-spartan" v-for="category in categories" :key="category" v-slot="{ active }">
          <button @click="selectCategory(category)" :class="[
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block w-full px-4 py-2 text-left text-sm'
          ]">
            {{ category }}
          </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
