import { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  const [lists, setList] = useState(() => {
    const savedList = localStorage.getItem("lists");

    return savedList ? JSON.parse(savedList) : [];
  });

  const [selectedList, setSelectedList] = useState("dashboard");

  const [isInputOpen, setIsInputOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  return (
    <>
      <div className="main-layout">
        <Sidebar
          lists={lists}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
          setList={setList}
          isInputOpen={isInputOpen}
          setIsInputOpen={setIsInputOpen}
        />

        <Dashboard
          selectedList={selectedList}
          lists={lists}
          setList={setList}
          isInputOpen={isInputOpen}
          setIsInputOpen={setIsInputOpen}
        />
      </div>
    </>
  );
}

export default App;
