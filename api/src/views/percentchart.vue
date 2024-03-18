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
let borototals=[]
let violationnumbers = []
let boropercents=[]


async function f1() {
  const data = await today()
  for(let i=0; i<data.length; i++){
    if(data[i].violationcode){
       if(!boros.includes(data[i].boro)){
        boros.push(data[i].boro)
        boronumbers.push(1)
        violationnumbers.push(1)
        }
        else{
        let index=boros.indexOf(data[i].boro)
        boronumbers[index]+=1
        violationnumbers[index]+=1
        }}
  }
  for(let i=0; i<boros.length; i++){
    let percentage = (violationnumbers[i] / borototals[i])*100
    boropercents.push(percentage)
  }
  console.log(boros, boronumbers)
  let returned = {
        labels: boros,
        datasets:  percentage
      }
  return returned
}

const returned_data = await f1()
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
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: 100
          }
        }]
      }
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