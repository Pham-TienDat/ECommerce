import '../FlashSale/FlashSale.css'
import React, { useState, useEffect } from "react";
export default function FlashSale(){
     let gio;
     let phut;
     let giay;
     const calculateTimeRemaining = () => {
         let now = new Date();
         let nextDay= new Date(now.getFullYear(),now.getMonth(),now.getDate()+1,0,0,0,0);
         return nextDay.getTime()-now.getTime();
    }
    const [timeRemaining, setTime] = useState(calculateTimeRemaining);
    
    useEffect(() => {
        const timer= setInterval(() => {
            setTime((t)=> t-1000);
        },1000);
        return ()=>clearInterval(timer);
    },[timeRemaining]);
    gio=Math.floor(timeRemaining/3600000);
    phut=Math.floor((timeRemaining-gio*3600000)/60000);
    giay=Math.floor((timeRemaining-gio*3600000-phut*60000)/1000);
    return(
    <>
    <div className="header">
         <h2>FlashSale</h2>
         <div className="remainingTime">
              <div>{gio>9?gio:'0'+gio}</div>
              <div>{phut>9?phut:'0'+phut}</div>
              <div>{giay>9?giay:'0'+giay}</div>

         </div>
    </div>
    <ul className="flashSale">
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
   <li >abc</li>
    </ul>
    </>);
}