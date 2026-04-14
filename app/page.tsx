"use client";

import Scene from "@/components/Scene";
import UI from "@/components/UI";
import { Canvas } from "@react-three/fiber";

const App = () => {
  return (
    <main className={`w-screen h-screen relative`}>
      <Canvas>
        <Scene/>
      </Canvas>
      <UI/>
    </main>
  )
}

export default App;