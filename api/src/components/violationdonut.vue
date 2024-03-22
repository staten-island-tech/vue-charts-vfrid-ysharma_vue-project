<template>
    <main>
      <div class="flex-container">
        <div class="chartcontainer">
          <Doughnut :data="chartData" :options="options" />
        </div>
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
        let boros = []
        let boronumbers = []
        let violations = []
        let boropercents = []
        let violationnumbers = []
        let criticalflag = []
        let criticalnumber = []
  
        const data = this.apidata
  
        for (let i = 0; i < data.length; i++) {
          if (data[i].hasOwnProperty('violation_code') && !violations.includes(data[i].violation_code)) {
            violations.push(data[i].violation_code)
            violationnumbers.push(1)
          } else if (data[i].hasOwnProperty('violation_code')) {
            let index = violations.indexOf(data[i].violation_code)
            violationnumbers[index] += 1
          }
        }
  
        let all = []
        let violationnumbers2 = []
        let violations2 = []
  
        for (let i = 0; i < violationnumbers.length; i++) {
          if (violationnumbers[i] > 1000) {
            let temp = []
            temp.push(violationnumbers[i])
            temp.push(violations[i])
            all.push(temp)
          }
        }
  
        all.sort((a, b) => b[0] - a[0])
  
        for (let i = 0; i < all.length; i++) {
          violationnumbers2.push(all[i][0])
          violations2.push(all[i][1])
        }
        console.log(violations2)
        this.chartData = {
          labels: violations2,
          datasets: [
            {
              label: 'apidata',
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
    flex: auto
  }
  
  .chartcontainer {
    height: 1000px;
    width: 2000px
  }
  </style>