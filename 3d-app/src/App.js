import {
  Canvas,
  useFrame,
  extend,
  useThree,
  useLoader,
} from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Suspense, useRef } from "react";
extend({ OrbitControls });

const Box = (props) => {
  const ref = useRef();
  const texture = useLoader(THREE.TextureLoader, "/texture/metal.jpg");
  useFrame((state) => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  const handlePointerDown = (e) => {
    e.object.active = true;
    if (window.activeMesh) {
      scaleDown(window.activeMesh);
      window.activeMesh = false;
    }
    window.activeMesh = e.object;
  };
  const scaleDown = (object) => {
    object.scale.y = 1;
    object.scale.x = 1;
    object.scale.z = 1;
    object.active = false;
  };
  const handlePointerEnter = (e) => {
    e.object.scale.x = 1.5;
    e.object.scale.y = 1.5;
    e.object.scale.z = 1.5;
  };
  const handlePointerLeave = (e) => {
    if (!e.object.active) {
      e.object.scale.x = 1;
      e.object.scale.y = 1;
      e.object.scale.z = 1;
    }
  };

  return (
    <mesh
      {...props}
      ref={ref}
      position={props.position}
      castShadow
      receiveShadow
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
    >
      <boxGeometry />
      <meshPhysicalMaterial
        color="white"
        metalness={1}
        roughness={0.3}
        map={texture}
      />
    </mesh>
  );
};

const Orbit = () => {
  const { camera, gl } = useThree();
  return <orbitControls args={[camera, gl.domElement]} />;
};

const Sun = (props) => {
  return (
    <mesh {...props}>
      <pointLight castShadow intensity={props.intensity} />
      <sphereGeometry args={[0.3]} />
      <meshPhongMaterial emissive="yellow" />
    </mesh>
  );
};

const Floor = (props) => {
  return (
    <mesh {...props} receiveShadow>
      <planeGeometry />
      <meshPhysicalMaterial color="white" />
    </mesh>
  );
};

const BackGround = (props) => {
  const texture = useLoader(THREE.TextureLoader, "/texture/back.jpg");

  const { gl } = useThree();

  const formatted = new THREE.WebGLCubeRenderTarget(
    texture.image.height
  ).fromEquirectangularTexture(gl, texture);

  return <primitive attach="background" object={formatted.texture} />;
};

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        shadows
        style={{ background: "black" }}
        camera={{ position: [3, 3, 3] }}
      >
        <Suspense fallback={null}>
          <Box position={[0, 1, 0]} />
          <Box position={[2, 1, 2]} />
          <BackGround />
        </Suspense>
        <axesHelper args={[5]} />
        <Orbit />
        <ambientLight intensity={0.2} />
        <Sun position={[0, 3, 0]} intensity={[50]} />
        <Floor rotation={[-Math.PI / 2, 0, 0]} scale={[20, 10, 0.5]} />
      </Canvas>
    </div>
  );
}

export default App;
/*function App() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.innerHTML = "";
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({
    color: "blue",
  });

  camera.position.z = 5;
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.02;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  return null;
}

export default App;
*/
