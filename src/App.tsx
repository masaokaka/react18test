import React, { useState, Suspense,useMemo } from 'react';
import './App.css'
import { RenderingNotifier } from './RenderingNotifier'

function sleep (ms: number) {
  return new Promise(resolve =>  setTimeout(resolve,ms))
}

const AlwaysSuspended: React.VFC = () => {
  console.log("aaaa");
  throw sleep(1000);
}

const SometimeSuspended:React.VFC = () => {
  if (Math.random() < 0.5) {
    throw sleep(1000);
  }
  return <p>Hello World!!</p>
}

async function fetchData1(): Promise<string> {
  await sleep(1000);
  return `Hello, ${(Math.random() * 1000).toFixed(0)}`;
}

 export const DataLoader: React.VFC = () => {
   const [loading, setLoading] = useState(false);
   const [data, setData] = useState<string | null>(null);

  const _ = useMemo(() => {
    if (loading) {
      console.log("loading is true");
    }
    return 1;
  }, [loading]);

   // ローディングフラグが立っていてdataがまだ無ければローディングを開始する
   if (loading && data === null) {
     throw fetchData1().then(setData);
   }
   // データがあればそれを表示
   return (
     <div>
       <div>Data is {data}</div>
       <button className="border p-1" onClick={() => setLoading(true)}>
         load
       </button>
     </div>
   );
 };


function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="text-center">
      <h1 className="text-2xl">React App!</h1>
      <Suspense fallback={<p>...loading</p>}>
        <DataLoader/>
      </Suspense>
    </div>
  )
}

export default App
