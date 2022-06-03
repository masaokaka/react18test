import React, { Suspense } from 'react';
import './App.css'

function sleep (ms: number) {
  return new Promise(resolve =>  setTimeout(resolve,ms))
}

/** 1秒後に文字列を返す非同期関数 */
async function fetchData1(): Promise<string> {
  await sleep(1000);
  return `Hello, ${(Math.random() * 1000).toFixed(0)}`;
}
const dataMap: Map<string, unknown> = new Map();
function useData<T>(cacheKey: string, fetch: ()=>Promise<T>): T {
  const cachedData = dataMap.get(cacheKey) as T | undefined; // as を使っているので危険だが、今回は良しとする。
  if (cachedData === undefined) {
    throw fetch().then((d) => dataMap.set(cacheKey, d));
  }
  return cachedData;
}

/** suspendするコンポーネント */
export const DataLoader1: React.VFC = () => {
  const data = useData("aaaa",fetchData1);
   // データがあればそれを表示
   return (
     <div>
       <div>Data is {data}</div>
     </div>
   );
 };
/** suspendするコンポーネント */
export const DataLoader2: React.VFC = () => {
  const data = useData("bbbb",fetchData1);
   // データがあればそれを表示
   return (
     <div>
       <div>Data is {data}</div>
     </div>
   );
 };


function App() {
  return (
    <div className="text-center">
      <h1 className="text-2xl">React App!</h1>
      <Suspense fallback={<p>...loading</p>}>
        <DataLoader1/>
        <DataLoader2/>
      </Suspense>
    </div>
  )
}

export default App
