import { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { animated } from "react-spring";

import UserList from "./components/user-list";
import Form from "./components/form";
import userData from "./userData";

import useTransitions from "./helpers/transitions";

function App() {
  const prevIndexRef = useRef(-1);

  const [data, setData] = useState(userData);
  const [editingIndex, setEditingIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const transitions = useTransitions(activeIndex, prevIndexRef);

  return (
    <div className="app">
      {transitions((props, item) => (
        <animated.div style={props} className="slide">
          <Routes location={item}>
            <Route
              path="/users-list/"
              element={
                <UserList
                  setEditingIndex={setEditingIndex}
                  setData={setData}
                  data={data}
                  setActiveIndex={setActiveIndex}
                />
              }
            />
            <Route
              path="/users-list/form"
              element={
                <Form
                  data={data}
                  setData={setData}
                  setActiveIndex={setActiveIndex}
                  editingIndex={editingIndex}
                  setEditingIndex={setEditingIndex}
                />
              }
            />
          </Routes>
        </animated.div>
      ))}
    </div>
  );
}

export default App;
