<template>
  <navbar/>
  <h2>Average Score per Complaint</h2>
  <h3>The higher the score, the more severe the violation</h3>
  <h4>(The lower the better)</h4>
  <div v-if="isDataLoaded">
    
    <NameChart :apidata="apiData" />

  </div>
  <div v-else>Loading...</div>
</template>
<script>
import NameChart from '../components/NameChart.vue'
import navbar from '../components/navbar.vue'

export default {
  components: {
    NameChart,
    navbar
  },
  data() {
    return {
      apiData: null,
      isDataLoaded: false
    }
  },
  async created() {
    try {
      const data = await today()
      this.apiData = data
      this.isDataLoaded = true
    } catch (err) {
      console.log(err.message)
    }
  },
  async created() {
    try {
      const data = await today()
      this.apiData = data
      this.isDataLoaded = true
    } catch (err) {
      console.log(err.message)
    }
  }
}


async function today() {
  try {
    const response = await fetch("https://data.cityofnewyork.us/resource/43nn-pn8j.json?$limit=300000")
    if (!response.ok) {
      throw new Error(response.status)
    }


    const data = await response.json()
    console.log(data)
    return data
  } catch (err) {
    console.log(err.message)
  }
}


</script>
