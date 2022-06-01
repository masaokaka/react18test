import React, { useState, Suspense } from 'react';
import './App.css'

function sleep (ms: number) {
  return new Promise(resolve=>setTimeout(resolve,ms))
}

const AlwaysSuspended: React.VFC = () => {
  console.log("aaaa");
  throw sleep(1000);
}
ss

const SometimeSuspended:React.VFC = () => {
  if (Math.random() < 0.5) {
    throw sleep(1000);
  }
  return <p>Hello World!!</p>
}

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="text-center">
      <h1 className="text-2xl">React App!</h1>
      <Suspense fallback={<p>...loading</p>}>
        <SometimeSuspended />
        <button className='border p-1' onClick={()=>setCount((c)=> c + 1)}>{count}</button>
      </Suspense>
    </div>
  )
}

export default App
