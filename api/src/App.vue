<script>
import { RouterLink, RouterView } from 'vue-router'
import NameChart from './components/NameChart.vue'

export default {
  name: 'App',
  components: { NameChart }
}

</script>

<template>

<BarChart />
  <RouterView />
</template>

<style scoped>

</style>
