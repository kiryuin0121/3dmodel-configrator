import * as THREE from 'three'
import { JSX, useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useAtomValue } from 'jotai'
import { shoeConfigAtom } from '@/atoms/shoe'

type GLTFResult = GLTF & {
  nodes: {
    shoe: THREE.Mesh
    shoe_1: THREE.Mesh
    shoe_2: THREE.Mesh
    shoe_3: THREE.Mesh
    shoe_4: THREE.Mesh
    shoe_5: THREE.Mesh
    shoe_6: THREE.Mesh
    shoe_7: THREE.Mesh
  }
  materials: {
    laces: THREE.MeshStandardMaterial
    mesh: THREE.MeshStandardMaterial
    caps: THREE.MeshStandardMaterial
    inner: THREE.MeshStandardMaterial
    sole: THREE.MeshStandardMaterial
    stripes: THREE.MeshStandardMaterial
    band: THREE.MeshStandardMaterial
    patch: THREE.MeshStandardMaterial
  }
}
type Props = {
  position?:[number,number,number],
  rotation?:[number,number,number]
}
const Shoe = ({position=[0,0,0],rotation=[0,0,0]}:Props) => {
  const { nodes, materials } = useGLTF('/models/shoe.glb') as unknown as GLTFResult
  const shoeConfig = useAtomValue(shoeConfigAtom)

  const leather = useTexture({
    map:          '/textures/leather/Leather_004_COLOR.png',
    normalMap:    '/textures/leather/Leather_004_NRM.png',
    aoMap:        '/textures/leather/Leather_004_OCC.png',
    roughnessMap: '/textures/leather/Leather_004_SPEC.png',
  })

  useEffect(() => {
    Object.values(leather).forEach((tex) => {
      tex.wrapS = THREE.RepeatWrapping
      tex.wrapT = THREE.RepeatWrapping
      tex.repeat.set(3, 3)
      tex.needsUpdate = true
    })
  }, [leather])

  const materialProps = (part: keyof typeof shoeConfig) => {
    const { color, texture } = shoeConfig[part]
    if (texture === 'leather') {
      return { ...leather, color, roughness: 0.8, metalness: 0.0 }
    }
    return { color }
  }

  return (
    <group dispose={null} position={position} rotation={rotation}>
      {/* シューレース */}
      <mesh geometry={nodes.shoe.geometry}>
        <meshStandardMaterial {...materials.laces} {...materialProps('laces')} />
      </mesh>

      {/* アッパー */}
      <mesh geometry={nodes.shoe_1.geometry}>
        <meshStandardMaterial {...materials.mesh} {...materialProps('mesh')} />
      </mesh>

      {/* シューホール */}
      <mesh geometry={nodes.shoe_2.geometry}>
        <meshStandardMaterial {...materials.caps} {...materialProps('caps')} />
      </mesh>

      {/* インナー */}
      <mesh geometry={nodes.shoe_3.geometry}>
        <meshStandardMaterial {...materials.inner} {...materialProps('inner')} />
      </mesh>

      {/* ミッドソール */}
      <mesh geometry={nodes.shoe_4.geometry}>
        <meshStandardMaterial {...materials.sole} {...materialProps('sole')} />
      </mesh>

      {/* ストライプ */}
      <mesh geometry={nodes.shoe_5.geometry}>
        <meshStandardMaterial {...materials.stripes} {...materialProps('stripes')} />
      </mesh>

      {/* シュータン */}
      <mesh geometry={nodes.shoe_6.geometry}>
        <meshStandardMaterial {...materials.band} {...materialProps('band')} />
      </mesh>

      {/* バックタブ */}
      <mesh geometry={nodes.shoe_7.geometry}>
        <meshStandardMaterial {...materials.patch} {...materialProps('patch')} />
      </mesh>
    </group>
  )
}

export default Shoe
useGLTF.preload('/models/shoe.glb')