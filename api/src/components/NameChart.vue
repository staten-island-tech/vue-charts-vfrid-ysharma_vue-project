<script>
import { Bar, Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
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
        calculateChartData(){
            let boros = ['Manhattan', 'Brooklyn', 'Bronx', 'Staten Island', 'Queens']
            let names = []
            let big_names = []
            let boronumbers=[]
            let name_violation=0
            let boropercents=[]
            let violationnumbers = []
            let criticalflag = []
            let criticalnumber = []

            const data = this.apidata
            for(let i=0;i<boros.length;i++){
                boronumbers.push(0)
                violationnumbers.push(0)
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
            this.chartData = {
                    labels: boros,
                    datasets:  [
                        {
                            label: 'Average Score per Complaint',
                            backgroundColor: ['#f7706e', '#497397', '#49f493', '#a16395', '#e9e572'],
                            data:boronumbers
                        }
                    ]
                }
            }

        }

}
</script>

<template>
    <main>
      <div class="flex-container">
        <div class="chartcontainer">
          <Bar :data="chartData" :options="options" />
        </div>
      </div>
    </main>
  </template>
  
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
