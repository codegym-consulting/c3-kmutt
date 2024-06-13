<script lang="ts" setup>
definePageMeta({
  layout: 'default',
})

const thailandMapRef = ref(null)

onMounted(() => {
    // document.getElementById('TH32').setAttribute('fill', '#CCC0FD');
    // document.getElementById('TH10').setAttribute('fill', '#CCC0FD');
    // document.getElementById('TH21').setAttribute('fill', '#CCC0FD');
    setInterval(randomFillColor, 500);
})
function randomFillColor() {
  const min = 10;
  const max = 96;
  const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
  const element = document.getElementById('TH' + randomId);

  if (element) {
    let isFilled = false;
    element.hasAttribute('fill') ? isFilled = true : isFilled = false;
    if (isFilled) {
      element.removeAttribute('fill'); // Unfill color
    } else {
      element.setAttribute('fill', '#CCC0FD'); // Fill color
      const randomId2 = Math.floor(Math.random() * (max - min + 1)) + min;
      const element2 = document.getElementById('TH' + randomId2);
      element2?.removeAttribute('fill');
    }

    isFilled = !isFilled;
  }
}

</script>
<template>
<div class="container h-full">
    <SearchMap ref="thailandMapRef" />
</div>
</template>