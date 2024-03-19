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
  

  export const returned_data = await f1()

