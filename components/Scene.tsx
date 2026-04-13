"use client";

const Scene = () => {
  return (
    <>
      <color attach="background" args={["#213547"]} />
        <fog attach="fog" args={["#213547", 10, 20]} />
    </>
  )
}

export default Scene