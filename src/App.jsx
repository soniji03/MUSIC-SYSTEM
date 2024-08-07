import { useState } from 'react'
import './App.css'
import Music from './components/music'

function App() {

  const tracks = [
    { 
      title: "Hanuman Chalisa", 
      src: "/Hanuman_Chalisa_Hariharan,_Gulshan_Kumar_192_MyMp3Bhojpuri_In.mp3" 
    },
    { 
      title: "Zindagi Ka Safar Hai Yeh Kaisa Safar", 
      src: "/01. Zindagi Ka Safar Hai Yeh Kaisa Safar.mp3" 
    }, { 
      title: "Tum Aa Gaye Ho Noor Aa Gaya", 
      src: "/05. Tum Aa Gaye Ho Noor Aa Gaya.mp3" 
    }, { 
      title: "Chura Liya Hai Tumne ", 
      src: "/Chura Liya Hai Tumne (Yaadon Ki Baraat) (PagalWorld.com).mp3" 
    }, { 
      title: "Ghar Se Nikalte Hi", 
      src: "/Ghar Se Nikalte Hi - Armaan Malik 320Kbps.mp3" 
    }, { 
      title: "Hamare sath shree raghunath", 
      src: "/Hamare-sath-shree-raghunath.mp3" 
    }, { 
      title: "Kisi Shayar Ka Dil Banke", 
      src: "/Kisi Shayar Ka Dil Banke_320(PaglaSongs).mp3" 
    },
    { 
      title: "Sankatmochan Hanuman Ashtak ", 
      src: "/new_128_Sankatmochan Hanuman Ashtak - Hariharan.mp3" 
    }, { 
      title: "O Mere Sona Re", 
      src: "/O Mere Sona Re - King-(DJMaza).mp3" 
    }, { 
      title: "O Mere Sona Re Sona Teesri Manzil", 
      src: "/O Mere Sona Re Sona Teesri Manzil 128 Kbps.mp3" 
    }, { 
      title: "Sajdaa", 
      src: "/Sajdaa - Rahat Fateh Ali Khan 320Kbps.mp3" 
    },
    { 
      title: "Bajrang Baan", 
      src: "/Om Cham Cham Chapal Chalanta – Bajrang Baan.mp3" 
    },
    
  ];

  return (
    <div className="App">
    <Music tracks={tracks} />
  </div>
  )
}

export default App
