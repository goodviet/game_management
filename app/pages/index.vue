<template>
  <div class="min-h-screen w-full overflow-x-hidden font-spartan bg-white">
    <Navbar />

    <div class="flex flex-col md:flex-row items-center md:items-start pt-8 px-4 md:px-10 gap-10 ">
      <!-- Left image -->
      <div class="w-full md:w-1/3 flex justify-center md:justify-end ">
        <img src="../assets/img/decor/decor_home.png" class="max-h-[400px] w-auto object-contain" alt="Game Decor" />
      </div>

      <!-- Right content -->
      <div class="w-full md:w-2/3 py-6 px-2 md:px-6 space-y-10 text-black ">
        <div class="space-y-4">
          <p class="text-base md:text-xl leading-relaxed">
            Welcome to our world of gaming! Dive into an epic adventure with our Smilegate demo. Unleash your skills and
            experience endless fun! Stunning graphics, fast-paced battles, and immersive gameplay await. Are you ready
            to take on the challenge and become a legend?
          </p>
          <ul class="list-disc pl-5 text-sm md:text-lg space-y-1">
            <li>Explore diverse game genres and discover new favorites.</li>
            <li>Engage in thrilling quests and conquer formidable foes.</li>
            <li>Customize your avatar and gear to match your playstyle.</li>
            <li>Join a vibrant community of gamers and forge alliances.</li>
            <li>Embark on a journey where every choice shapes your destiny.</li>
          </ul>

        </div>

        <!-- CTA Button -->
        <div class="flex md:justify-start justify-center">
          <CustomButton class="" @click="$router.push('/game_list')" :label="'Game List'"
            :icon="['fas', 'arrow-right']" icon-position="right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import CustomButton from '../components/CustomButton.vue'
</script>
