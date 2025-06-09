import "./App.css";
import { useState } from "react";
import TypesBar from "./components/TypesBar";
import PokemonsContainer from "./components/PokemonsContainer";

function App() {
  const [type, setType] = useState("ice");

  return (
    <div className="wrapper">
      <h1 className="logo-pokemon">포켓몬 도감</h1>

      {/* TypesBar에서 type을 변경합니다. type변경을 할 수 있도록 setType을 props로 전달해주세요 */}
      <TypesBar setType={setType} />
      {/* 변경된 type에 따라서 포켓몬 리스트가 변경됩니다. type을 props로 전달해주세요 */}
      <PokemonsContainer type={type} />
    </div>
  );
}

export default App;
