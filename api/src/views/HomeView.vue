<template>
  
  <div v-if="isDataLoaded">
    
    <violationdonut :apidata="apiData" />
    <NameChart :apidata="apiData" />
    <totalpie :apidata="apiData" />

  </div>
  <div v-else>Loading...</div>
</template>

<script>
import violationdonut from '../components/violationdonut.vue'
import NameChart from '../components/NameChart.vue'
import totalpie from '../components/totalpie.vue'


export default {
  components: {
    violationdonut,
    NameChart,
    totalpie
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
