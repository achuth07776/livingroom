import { Canvas } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';

function Scene() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}
const [selectedMaterial, setSelectedMaterial] = useState(defaultMaterial);
const applyMaterial = (material) => {
    setSelectedMaterial(material);
  };
  function MaterialSelector({ onSelect }) {
    const materials = [/*...array of materials*/];
    return (
      <div>
        {materials.map((material, index) => (
          <button key={index} onClick={() => onSelect(material)}>
            <img src={material.thumbnail} alt="material" />
          </button>
        ))}
      </div>
    );
  }
  function App() {
    const [material, setMaterial] = useState(/* default material */);
  
    return (
      <div className="app-container">
        <MaterialSelector onSelect={setMaterial} />
        <Scene selectedMaterial={material} />
      </div>
    );
  }
      