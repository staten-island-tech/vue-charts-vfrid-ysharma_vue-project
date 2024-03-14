<script>
import { Bar, Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)


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
let names = []
let big_names = []
let boronumbers=[]
let name_violation=0
let boropercents=[]
let violationnumbers = []
let criticalflag = []
let criticalnumber = []

async function f1() {
  const data = await today()
  for(let i=0; i<data.length; i++){
    if(data[i].score > 0){
        if(names.includes(data[i].dba)){
            let index = names.indexOf(data[i].dba)
            name_violations = names[index].violations
            name_violations += 1
        }
        else{
            names.push({name:data[i].dba, violations:1})
        }
    }
    for(let i=0; i<names.length; i++){
        if(names[i].violations > 100){
            big_names.push({name:name[i].dba, violations:name[i.violations]})
        }
    }
  }
  console.log(names, big_names)
  let returned = {
        labels: big_names.name,
        datasets:  big_names.violations
      }
  return returned
}

const returned_data = await f1()
export default {
  name: 'PieChart',
  components: { Pie },
  data() {
    return {
      chartData: {
        labels:  returned_data.labels ,
        datasets: [
          {
            backgroundColor: ['#f7706e', '#497397', '#49f493', '#a16395', '#e9e572'],
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
    <Pie :data="chartData" />
  <!-- <button @click="rask">boros</button> -->
  </main>
</template>