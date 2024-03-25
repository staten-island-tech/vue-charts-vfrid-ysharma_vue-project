<script>
import { Bar, Pie } from 'vue-chartjs'
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

for(let i=0; i<data.length; i++){
  if(data[i].hasOwnProperty('violation_code')){
      if(!boros.includes(data[i].boro)){
      boros.push(data[i].boro)
      boronumbers.push(1)
      }
      else{
      let index=boros.indexOf(data[i].boro)
      boronumbers[index]+=1
      }}
}

let returned = {
      labels: boros,
      datasets:  boronumbers
    }

console.log(returned_data.datasets)
export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels:  returned_data.labels ,
        datasets: [
          {
            label: 'data',
            backgroundColor: '#f87979',
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
    <!-- <TheWelcome /> -->
    <Bar :data="chartData" />
  <!-- <button @click="rask">boros</button> -->
  </main>
</template>