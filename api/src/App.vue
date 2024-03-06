<script>
import { RouterLink, RouterView } from 'vue-router'
import BarChart from './components/BarChart.vue'

export default {
  name: 'App',
  components: { BarChart }
}

</script>

<template>

<BarChart />
  <RouterView />
</template>

<style scoped>

</style>
