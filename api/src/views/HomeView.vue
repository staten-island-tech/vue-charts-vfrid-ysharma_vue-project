<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


async function today(x) {
  try {
    const response = await fetch("https://data.cityofnewyork.us/resource/43nn-pn8j.json?$limit=300000");
    if (!response.ok) {
      throw new Error(response.status);
    }

    const data = await response.json();
    console.log(data); 
    return data

  } catch(err) {
    console.log(err.message); 
  }
}
let boros = []
let boronumbers=[]
let violations = []
let violationnumbers = []
let criticalflag = []
let criticalnumber = []

async function f1() {
  const data = await today()
  for(let i=0; i<data.length; i++){
    if(data[i].boro!=="0" && !boros.includes(data[i].boro)){
      boros.push(data[i].boro)
      boronumbers.push(0)
    }
    else{
      let index=boros.indexOf(data[i].boro)
      boronumbers[index]+=1
    }
  }
  console.log(boros, boronumbers)
  let returned = {
        labels: boros,
        datasets: [ { data: boronumbers } ]
      }
  return returned
}
const returned_data = await f1()
export default {
  name: 'BarChart',
  components: { Bar },
  // data: () => ({
  //   loaded: false,
  //   chartData: null
  // }),
  // async mounted () {
  //   this.loaded = false

  //   try {
  //     const { userlist } = await f1()
  //     this.chartdata = userlist

  //     this.loaded = true
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }
  data() {
    return {
      chartData: {
        labels: [ returned_data.labels ],
        datasets: [
          {
            label: 'data',
            data: returned_data.datasets
          }
        ]
      }
    }
  }
}
</script>

<template>
  <main>
    <Bar :data="chartData" />
  <!-- <button @click="rask">boros</button> -->
  </main>
</template>
