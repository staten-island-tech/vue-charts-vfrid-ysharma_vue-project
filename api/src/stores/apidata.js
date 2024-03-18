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

  export const apidata = await today()

