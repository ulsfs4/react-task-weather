import { useState, useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'

function App() {
  useEffect(()=>{
    document.title="to-do x weather";

  },[]);
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [temp, setTemp] = useState({
    tempt:null,
    img:null,
    description:null,
  })
  useEffect(()=>{
    axios.get('https://api.openweathermap.org/data/2.5/weather?lat=28.03&lon=1.66&appid=b4d05af3a80739ee347edbe673f3e40c')
  .then(function (response) {

    const result = Math.round(response.data.main.temp-272.15);
    const Timg = response.data.weather[0].icon;
    const des= response.data.weather[0].description;
    setTemp({
      tempt:result,
      img: `https://openweathermap.org/img/wn/${Timg}@2x.png`,
      description:des,
    }
    );
    console.log(response);

  })
  .catch(function (error) {
    console.log(error);
  })
    
  },[])

  function buttonclick(){
    if (task!=""){
    setTasks(
      [task,...tasks]
    )
    setTask("") }
    }
    function deletee(index){
      const newtasks = tasks.filter((t,i)=>{
        if(i==index) {return false;}
        else return true;
      });
      setTasks(newtasks);
    }

    function editee(task){
      setTask(task)
      

    }

  return (
    
    <>
    <div className='main'>
      <div className='first'>
        <div className='details'>
          <h1>Algiers</h1>
        </div>
        <div className='first2'>
          <div className='details1'><img src={temp.img} /></div>
          <div className='details2'><h1>{temp.tempt} C°</h1></div>
          <div className='details2'><h3>{temp.description}</h3></div>
          <div className='details3'><h3>{moment().format('lll') } </h3></div>
        </div>
      </div>
      <div className='mainbox'>
        <div className='inputcontainer'>
          <div>
            <input placeholder='Add a to-do' value={task} onSubmit={buttonclick} onChange={(e)=>setTask(e.target.value)} type="text" />
          </div>
          <button onClick={buttonclick} >Add</button>
        </div>
        
        

          {tasks.map((task, index) => (
          
          <div key={index} className='todobox'>
          <h3>{task} </h3><div><button className='butt' onClick={()=>deletee(index)}>del</button> <button className='butt' onClick={()=>editee}>edit</button></div>
          </div>
          ))}
        
        
        

      </div>
      </div>
    </>
  )
}

export default App
