<template>
  <navbar/>
  <h2>Violations recorded at least 1000 times</h2>

    <div v-if="isDataLoaded">
      
      <violationdonut :apidata="apiData" />
  
    </div>

    <div v-else>Loading...</div>
  </template>
  <script>
  import violationdonut from '../components/violationdonut.vue'
  import navbar from '../components/navbar.vue'

  
  export default {
    components: {
      violationdonut,
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
  