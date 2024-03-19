<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)


async function today() {
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
let boropercents=[]
let violationnumbers = []
let criticalflag = []
let criticalnumber = []

async function f1() {
  const data = await today()
  for(let i=0; i<data.length; i++){
      if(data[i].hasOwnProperty('violation_code') && !violations.includes(data[i].violation_code)){
        violations.push(data[i].violation_code)
        violationnumbers.push(1)

        }   
      else if(data[i].hasOwnProperty('violation_code')){
        let index=violations.indexOf(data[i].violation_code)
        violationnumbers[index]+=1
      }
  }
  let violationnumbers2 =[]
  let violations2 =[]
  for(let i=0; i<violationnumbers.length; i++){
      if(violationnumbers[i]>1000){
        violationnumbers2.push(violationnumbers[i])
        violations2.push(violations[i])
      }
    }
  console.log(violationnumbers)

  console.log(violationnumbers2)
  let returned = {
        labels: violations2,
        datasets:  violationnumbers2
      }
  return returned
}

const returned_data = await f1()
// console.log(returned_data.datasets)
export default {
  name: 'BarChart',
  components: { Doughnut },
  data() {
    return {
      chartData: {
        labels: returned_data.labels,
        datasets: [
          {
            label: 'data',
            backgroundColor: ["#FF0000", "#FF3D00", "#FF7A00", "#FFB700", "#FFF400",
  "#BFFF00", "#8BFF00", "#57FF00", "#23FF00", "#00FF23",
  "#00FF57", "#00FF8B", "#00FFBF", "#00FFF4", "#00BFFF",
  "#008BFF", "#0057FF", "#0023FF", "#2300FF", "#5700FF",
  "#8B00FF", "#BF00FF", "#F400FF", "#FF00BF", "#FF008B",
  "#FF0057"],
            data: returned_data.datasets
          }
        ]
      },
      options: {
      }
    }
  }
}
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <Doughnut :data="chartData" :options="options"/>
  <!-- <button @click="rask">boros</button> --> 
  </main>
</template>