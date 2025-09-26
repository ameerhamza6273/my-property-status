<template>
  <div
    class="h-screen w-screen overflow-hidden fixed top-0 left-0 bg-white z-[9999] flex justify-center items-center flex-col text-black">
    <!-- Spinner -->
    <svg class="animate-spin h-12 w-12 text-black mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="black" stroke-width="4" />
      <path class="opacity-75" fill="black" d="M4 12a8 8 0 018-8V0C5.373 0 
     0 5.373 0 12h4zm2 5.291A7.962 
     7.962 0 014 12H0c0 3.042 1.135 
     5.824 3 7.938l3-2.647z" />

    </svg>

    <!-- Loading text with animated dots -->
    <div class="flex items-center space-x-1 text-lg font-semibold text-black">
      <span>Loading</span>
      <span class="loading-dots"></span>
    </div>

  </div>
</template>

<style scoped>
@keyframes dots {
  0% {
    content: "";
  }

  25% {
    content: ".";
  }

  50% {
    content: "..";
  }

  75% {
    content: "...";
  }

  100% {
    content: "";
  }
}

.loading-dots::after {
  color: black;
  /* ✅ ensure visible */
  content: "";
  animation: dots 1.5s infinite steps(1);
}
</style>
