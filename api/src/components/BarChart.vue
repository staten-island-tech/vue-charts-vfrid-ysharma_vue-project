<template>
  <div class="container">
    <Bar v-if="loaded" :data="chartData" />
  </div>
  </template>
  
  <script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data: () => ({
    loaded: false,
    chartData: null
  }),
  async mounted () {
    this.loaded = false

    try {
      const { response } = await fetch('https://data.cityofnewyork.us/resource/43nn-pn8j.json?$limit=300000')
      this.chartData = response
      // if(!response.ok){
      //   throw new Error(response.status);
      // }
      const data = await response.json
      console.log(data)
      this.loaded = true
    } catch (err) {
      console.log(err.message)
    }
  }
}

// async function today(x) {
//   try {
//     const response = await fetch("https://data.cityofnewyork.us/resource/43nn-pn8j.json?$limit=300000");
//     if (!response.ok) {
//       throw new Error(response.status);
//     }

//     const data = await response.json();
//     console.log(data); 

//   } catch(err) {
//     console.log(err.message); 
//   }

// }
// today()
</script>
