<template>
    <main>
      <div class="flex-container">
        <div class="chartcontainer">
          <Doughnut :data="chartData" :options="options" />
        </div>
        
      </div>
      <div class="flex-contain">
      <table border="1">
        <tr>
          <th>Violation Code</th>
          <th>Violation Description</th>
        </tr>
        <tr v-if="all && all.length" v-for="(item, index) in all" :key="index">
          <td>{{ item[1] }}</td>
          <td>{{ item[2] }}</td>
        </tr>
      </table>
    </div>
    </main>
  </template>
  
  <script>
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
  import { Doughnut } from 'vue-chartjs'
  
  ChartJS.register(ArcElement, Tooltip, Legend)
  
  export default {
    name: 'ViolationDonut',
    components: { Doughnut },
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
        let violations = []
        let violationnumbers = []
        let violationdescriptions = []

        const data = this.apidata
  
        for (let i = 0; i < data.length; i++) {
          if (data[i].hasOwnProperty('violation_code') && !violations.includes(data[i].violation_code)) {
            violations.push(data[i].violation_code)
            violationnumbers.push(1)
            violationdescriptions.push(data[i].violation_description)
          } else if (data[i].hasOwnProperty('violation_code')) {
            let index = violations.indexOf(data[i].violation_code)
            violationnumbers[index] += 1
          }
        }
  
        const all = []
        let violationnumbers2 = []
        let violations2 = []
        let descriptions2 = []
        for (let i = 0; i < violationnumbers.length; i++) {
          if (violationnumbers[i] > 1000) {
            let temp = []
            temp.push(violationnumbers[i])
            temp.push(violations[i])
            temp.push(violationdescriptions[i])
            all.push(temp)
          }
        }
  
        all.sort((a, b) => b[0] - a[0])
        
        for (let i = 0; i < all.length; i++) {
          violationnumbers2.push(all[i][0])
          violations2.push(all[i][1])
          descriptions2.push(all[i][2])
        }
        console.log(all)
        this.all = all
        this.chartData = {
          labels: violations2,
          datasets: [
            {
              backgroundColor: [  '#FF0000', '#FF3D00', '#FF7A00', '#FFB700', '#FFF400', '#BFFF00', '#8BFF00', '#57FF00', '#23FF00', '#00FF23',  '#00FF57', '#00FF8B', '#00FFBF', '#00FFF4', '#00BFFF', '#008BFF', '#0057FF', '#0023FF', '#2300FF', '#5700FF',  '#8B00FF', '#BF00FF', '#F400FF', '#FF00BF', '#FF008B', '#FF0057'],
              data: violationnumbers2
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
    height: 750px;
    width:750px;
  }
  table {
    margin-top: 20px;
  }
  </style>