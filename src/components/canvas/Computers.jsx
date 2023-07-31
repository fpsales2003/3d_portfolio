// 3d model page
// using three.js

import React, {Suspense, useEffect, useState} from 'react';

// use three.js canvas to load objects into the canvas
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Computers = ({isMobile}) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')

  return (
    // mesh tag is used to hold the geometry and material needed for a shape in 3D
    // hemisphere light is overhead lighting
    // point light is the direct lighting
    // primitive tag is used to pass the object
    <mesh>
      <hemisphereLight 
        intensity={1.5} 
        groundColor="black"
      />
      <pointLight
        intensity={2}
        position={[0, -1, 0.5]}
        decay={2}
        castShadow
      />
      <primitive 
        object={computer.scene}
        scale={isMobile ? 0.5 : 0.65}
        position={isMobile ? [0, -3, -1] : [0, -3.75, -1]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

// create new variable to add the object/model
const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
// Add a listener for changes to screen size
    const mediaQuery = window.matchMedia('(max-width: 500px)');

// set initial value of 'isMobile'
    setIsMobile(mediaQuery.matches);

// define a callback function to handle changes to media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }

// add the callback function as a listener for changes to media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

// remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, []);

  return (
// Suspense tag along with OrbitControls is used for camera movement
    <Canvas
      frameloop='demand'
      shadows
      camera={{ position: [20, 3, 5], fov: 25}}
      gl={{ preserveDrawingBuffer: true}}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false} 
          maxPolarAngle={Math.PI /2}
          minPolarAngle={Math.PI /2}
        />
        <Computers isMobile={isMobile}/>
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas;