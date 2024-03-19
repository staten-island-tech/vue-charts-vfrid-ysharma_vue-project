import { returned_data } from "./apidata"

export const data = {
  labels:  returned_data.labels ,
  datasets: [
    {
      label: 'data',
      backgroundColor: '#f87979',
      data: returned_data.datasets
    }
  ]
}

export const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: true,
        },
        y: {
                  suggestedMin: 0,
                  suggestedMax: 32000
              }
      }
    }