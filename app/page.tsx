"use client";

import Scene from "@/components/Scene";
import { Canvas } from "@react-three/fiber";

const App = () => {
  return (
    <main className={`w-screen h-screen`}>
      <Canvas>
        <Scene/>
      </Canvas>
    </main>
  )
}

export default App;