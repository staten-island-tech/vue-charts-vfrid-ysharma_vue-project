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
let boros = ['Manhattan', 'Brooklyn', 'Bronx', 'Staten Island', 'Queens']
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
  for(let i=0;i<boros.length;i++){
    boronumbers.push(0)
    violationnumbers.push(0)
    console.log(boronumbers, violationnumbers)
  }
  for(let i=0; i<data.length; i++){
    names.push({name:data[i].dba, score:Number(data[i].score), boro:data[i].boro})
    for(let x=0; x<boros.length; x++){
      if(names[i].boro == boros[x]){
        violationnumbers[x] += 1
        if(isNaN(names[i].score)){
          name_violation = 0
          boronumbers[x] += name_violation
        }
        else{
          name_violation = 0
          name_violation += names[i].score
          boronumbers[x] += name_violation
        }
      }
      else{
        continue
      }
  }
  }
  for(let i=0;i<boros.length;i++){
    boronumbers[i] = boronumbers[i]/violationnumbers[i]

  }
  console.log(names, boronumbers)
  let returned = {
        labels: boros,
        datasets:  boronumbers
      }
  return returned
}

const returned_data = await f1()
export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels:  returned_data.labels ,
        datasets: [
          {
            label: 'Average Score per Complaint',
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
    <Bar :data="chartData" />
  <!-- <button @click="rask">boros</button> -->
  </main>
</template>