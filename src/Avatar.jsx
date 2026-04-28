import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Avatar({ emotion = 'default', isSpeaking = false, ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/model.glb')
  const { actions } = useAnimations(animations, group)
  
  // Find meshes with morph targets and the arm bones
  const skinnedMeshesRef = useRef([])
  
  // Initialize and update morph targets
  useFrame((state) => {
    const meshes = skinnedMeshesRef.current
    if (!meshes || meshes.length === 0) return
    
    // Helper to set a morph target on all applicable meshes
    const setMorph = (name, value) => {
      meshes.forEach(mesh => {
        const dict = mesh.morphTargetDictionary
        const influences = mesh.morphTargetInfluences
        if (dict && influences) {
          const idx = dict[name]
          if (idx !== undefined) {
            influences[idx] = THREE.MathUtils.lerp(influences[idx], value, 0.1)
          }
        }
      })
    }

    // Reset all morph targets
    meshes.forEach(mesh => {
      const influences = mesh.morphTargetInfluences
      if (influences) {
        for (let i = 0; i < influences.length; i++) {
          influences[i] = THREE.MathUtils.lerp(influences[i], 0, 0.1)
        }
      }
    })

    // Default eyes
    setMorph('eyeWideLeft', 0.4)
    setMorph('eyeWideRight', 0.4)

    // Apply emotion
    if (emotion === 'happy') {
      setMorph('mouthSmile', 0.8)
      setMorph('mouthSmileLeft', 0.8)
      setMorph('mouthSmileRight', 0.8)
      setMorph('cheekSquintLeft', 0.7)
      setMorph('cheekSquintRight', 0.7)
    } else if (emotion === 'sad') {
      setMorph('mouthFrownLeft', 0.8)
      setMorph('mouthFrownRight', 0.8)
      setMorph('browInnerUp', 0.8)
      setMorph('mouthRollLower', 0.5)
    } else if (emotion === 'angry') {
      setMorph('browDownLeft', 1.0)
      setMorph('browDownRight', 1.0)
      setMorph('mouthPressLeft', 0.6)
      setMorph('mouthPressRight', 0.6)
      setMorph('noseSneerLeft', 0.7)
      setMorph('noseSneerRight', 0.7)
    } else if (emotion === 'surprised') {
      setMorph('eyeWideLeft', 1.0)
      setMorph('eyeWideRight', 1.0)
      setMorph('browInnerUp', 1.0)
      setMorph('mouthDimpleLeft', 0.5)
      setMorph('mouthDimpleRight', 0.5)
    } else if (emotion === 'thinking') {
      setMorph('browDownLeft', 0.6)
      setMorph('browDownRight', 0.6)
      setMorph('mouthRollLower', 0.4)
      setMorph('eyeSquintLeft', 0.5)
      setMorph('eyeSquintRight', 0.5)
    } else if (emotion === 'confused') {
      setMorph('browOuterUpLeft', 1.0)
      setMorph('browDownRight', 0.8)
      setMorph('eyeWideLeft', 0.8)
      setMorph('mouthLeft', 0.4)
    } else if (emotion === 'excited') {
      setMorph('mouthSmile', 1.0)
      setMorph('eyeWideLeft', 0.8)
      setMorph('eyeWideRight', 0.8)
      setMorph('browInnerUp', 0.8)
    } else if (emotion === 'embarrassed') {
      setMorph('cheekSquintLeft', 0.8)
      setMorph('cheekSquintRight', 0.8)
      setMorph('mouthSmile', 0.4)
      setMorph('browDownLeft', 0.4)
      setMorph('browDownRight', 0.4)
    } else if (emotion === 'fear') {
      setMorph('eyeWideLeft', 1.0)
      setMorph('eyeWideRight', 1.0)
      setMorph('browInnerUp', 1.0)
      setMorph('mouthFrownLeft', 0.6)
      setMorph('mouthFrownRight', 0.6)
    } else if (emotion === 'neutral' || emotion === 'default') {
      // Neutral has no specific morphs beyond the default reset
    }

    // Apply speech animation
    if (isSpeaking) {
      const time = state.clock.getElapsedTime()
      const jawValue = (Math.sin(time * 10) + 1) / 2 * 0.35 // Up to 0.35
      const visemeValue = (Math.sin(time * 15) + 1) / 2 * 0.5 // Up to 0.5
      setMorph('jawOpen', jawValue)
      setMorph('viseme_aa', visemeValue)
    }
  })

  // We have to clone the scene or traverse it to find the SkinnedMesh to assign our ref
  useEffect(() => {
    const meshes = []
    group.current.traverse((child) => {
      if (child.isSkinnedMesh && child.morphTargetDictionary) {
        meshes.push(child)
      }
      
      // Rest Pose application
      if (child.isBone) {
        if (child.name === 'LeftArm') {
          child.rotation.set(1.5, 0, 0)
        }
        if (child.name === 'RightArm') {
          child.rotation.set(1.5, 0, 0)
        }
      }
    })
    skinnedMeshesRef.current = meshes
  }, [nodes])

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Scene || nodes.Scene || Object.values(nodes)[0]} />
    </group>
  )
}

useGLTF.preload('/model.glb')
