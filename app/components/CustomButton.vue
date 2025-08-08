<template>
    <div
        class="flex h-14 space-x-4 bg-orange-500 rounded-full items-center px-4 hover:cursor-pointer hover:bg-orange-600 hover:scale-110 transition">
        <template v-if="iconPosition === 'left'">
            <div class="h-10 w-10 flex justify-center items-center bg-black border-2 border-white rounded-full">
                <FontAwesomeIcon :icon="icon" class="text-white" />
            </div>
            <span class="text-white text-lg font-spartan">{{ label }}</span>
        </template>
        <template v-else>
            <span class="text-white text-lg font-spartan">{{ label }}</span>
            <div class="h-10 w-10 flex justify-center items-center bg-black border-2 border-white rounded-full">
                <FontAwesomeIcon :icon="icon" class="text-white" />
            </div>
        </template>
    </div>
</template>

<script setup>
defineProps({
    icon: Array,
    label: String,
    bg: String,
    iconPosition: {
        type: String,
        default: 'right', // hoặc 'left'
    },
});
</script>

<style scoped>

</style>