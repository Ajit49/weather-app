import { useState } from 'react';


function App() {

  let [city,setCity]=useState('')
  let [wDetails,setWdetails]=useState()
  let [isLoading,setIsloading]=useState(false)

  let getData=(event)=>{
    setIsloading(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
    .then((res)=>res.json())
    .then((finalRes)=>{
      if(finalRes.cod==="404"){
        setWdetails(undefined)
      }
      else{
        setWdetails(finalRes)
      }

      setIsloading(false)
    })

    event.preventDefault()
    setCity('')
  }

  /**useEffect(()=>{
    console.log("Wecome to WS")
  })**/

  return (
   <div className='W-[100%] h-[100vh] bg-[darkcyan]'>
    <div className='max-W-[1320px] mx-auto'>
      <h1 className='text-[40px] font-bold py-[50px] text-white ml-[60px]'>Simple Weather App</h1>

      <form onSubmit={getData}>
        <input type='text' value={city} onChange={(e)=>setCity(e.target.value)} className='w-[300px] h-[40px] ml-[60px] pl-3' placeholder='City Name'/>
        <button className='bg-[indianred] w-[100px] h-[40px] ml-[5px]'>Submit</button>
      </form>


      <div className='w-[400px] mx-auto bg-white shadow-lg m-[40px] p-[25px] relative'>

        <img src='https://www.msha.gov/sites/default/files/images/loading2.gif' alt='loading' width={100} 
        className={` absolute left-[40%] ${isLoading?'':'hidden'} `}/>
        
        {
          wDetails!==undefined
          ?
           <>
              <h3 className='font-bold text-[30px]'> {wDetails.name} <span className='bg-[yellow]'>
                {wDetails.sys.country}</span> </h3>
              <h4 className='font-bold text-[40px]'>{wDetails.main.temp}</h4>
              <img src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`} alt='icon'/>
              <p>
                {wDetails.weather[0].description}
              </p>
           </>
           :
           "No Data"
        }
        
      </div>

    </div>

   </div>
  );
}

export default App;
