<template>
    <main>
      <div class="flex-container">
        <div class="chartcontainer">
          <Pie :data="chartData" :options="options" />
        </div>
      </div>
    </main>
  </template>
  
  <script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

  
  export default {
    name: 'totalpie',
    components: { Pie },
    props: {
      apidata: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        chartData: null,
        options: {
          responsive: true,
          maintainAspectRatio: true
        }
      }
    },
    created() {
      this.calculateChartData()
    },
    methods: {
      calculateChartData() {
        let boroughs = []
        let boroughnumbers=[]
        
        const data = this.apidata
        console.log(data[2])
        for(let i=0; i<data.length; i++){
        if(data[i].hasOwnProperty('violation_code')){
            if(!boroughs.includes(data[i].boro)){
            boroughs.push(data[i].boro)
            boroughnumbers.push(1)
            console.log("hey1")
            }
            else{
            let index=boroughs.indexOf(data[i].boro)
            boroughnumbers[index]+=1
            }}
        }
        const boroughData = boroughs.map((borough, index) => ({
        borough,
        number: boroughnumbers[index]
        }));

        // Sort the array of objects based on the 'number' property
        boroughData.sort((a, b) => b.number - a.number);

        // Extract the sorted boroughs and boroughnumbers into separate arrays
        boroughs = boroughData.map(data => data.borough);
        boroughnumbers = boroughData.map(data => data.number);
        console.log(boroughs, boroughnumbers)
        this.chartData = {
          labels: boroughs,
          datasets: [
            {
              label: 'Total violations',
              backgroundColor: ['#f7706e', '#497397', '#49f493', '#a16395', '#e9e572'],
              data: boroughnumbers
            }
          ]
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .flex-container {
    display: flex;
    flex: auto;
    justify-content: center;
  }
  
  .chartcontainer {
    margin-top: 40px;
    height: 850px;
    width:850px;
  }
  </style>