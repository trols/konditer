import { useState } from 'react';
import { data } from './data';
import mainfoto from './mainfoto.jpeg';
import './App.css';

function App() {
const[cafes,setCafes]=useState(data);
const[showText,setShowText]=useState(false);

const removeCafes = (id)=>{
  let newCafes=cafes.filter(cafe=>cafe.id !== id);
  setCafes(newCafes)
}
const [foto,setFoto]=useState(0);
const[frames,setFrames]=useState(data);
let newArr=[...frames];

const previousFoto=(e,index)=>{
  const slide = document.querySelectorAll("#slide");
  newArr[index]=cafes[index];
  setFrames(newArr);
  setFoto((foto=>{
    foto -- ;
    if(foto < 0){
      foto=2;
      
    }   
     return foto;
  }))
  slide[index].setAttribute('src',newArr[index].image[foto]);
  return slide;
}

const nextFoto=(e, index)=>{
setFrames(newArr);
const slide = document.querySelectorAll("#slide");
newArr[index]=cafes[index];
setFoto((foto => {
  foto ++ ;
  if(foto > 2){
    foto=0;
  }
  return foto;
}))
slide[index].setAttribute('src' ,newArr[index].image[foto]);
return slide;}

const showTextClick=(item)=>{
  item.showMore =! item.showMore
 setShowText(!showText)
}

return(
    <div className='rt'>

        <div className='container'>
          <h2>5 ЛУЧШИХ КОНДИТЕРСКИХ</h2>
          </div>
          <div className='container'>
          <h2>Санкт-Петербурга</h2>
        </div>
          <div className='container'>
        <img src= { mainfoto } alt='fon' width='300px' className='maple'/>
           </div>
           <div className='container'>
          <h3>Осталось посетить {cafes.length}</h3>
        </div>
       {cafes.map((item =>{
            const{id,cafeName,check,image,description,source,showMore} = item;
            const index = cafes.indexOf(item);

            return(
              
              <div key={id} data-id={data.id}>

              <div className='container'>
          <h1>{id}.{cafeName}</h1>
        </div>
       <div className='container'>
        <img src = { image[0]} alt='ph' width='369px' height='250px'id='slide'/>
        </div>
        <div className='container'>
          <button onClick={ (e)=>previousFoto(e, index)} id={id} className='side'>НАЗАД</button>
          <button onClick={ (e)=>nextFoto(e, index)} id={id} className='side'>ВПЕРЕД</button>
           </div>
<div className='container'>
           <p>
            <img  src={check} alt='ph' width='40px'/>
          {showMore ? description : description.substring(0,25)}
          <button className='about' onClick={()=>showTextClick(item)}>{showMore ? "Свернуть" : "...Узнать больше"}</button>
          </p> 
        </div> 
       
        <div className='container'>
          <p className='par'>Источник : {source}</p> 
          </div>
<div className='container'>
          <button className='btn' onClick={()=>removeCafes(id)}>УДАЛИТЬ</button>
        </div>
       </div>
            )
            }))}
        
        <div className='container'>
        <button id='lastbtn' onClick={()=>setCafes([])}>Удалить все</button>
        </div>
        </div>
  );
      }

export default App;
