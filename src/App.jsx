import { useState, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';

import UserList from './components/user-list/UserList';
import Form from './components/form/Form';

import userData from './userData';

function App() {
  const prevIndexRef = useRef(-1);
    
  const [data, setData] = useState(userData);
  const [editingIndex, setEditingIndex] = useState(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  const transitions = useTransition(location, {
    from: {
      opacity: 0.8,
      transform:
        activeIndex > prevIndexRef.current
          ? "translateX(100%)"
          : "translateX(-100%)",
    },
    enter: {
      opacity: 1,
      transform: 'translateX(0%)',
    },
    leave: {
      opacity: 0.8,
      transform:
        activeIndex > prevIndexRef.current
          ? `translateX(-100%)`
          : `translateX(100%)`,
    },
    trail: 150,
    onRest: () => {
      prevIndexRef.current = activeIndex;
    },
  });

  return (
    <div className="app">
      {transitions((props, item) => (
        <animated.div style={props} className="slide">
          <Routes location={item}>
            <Route path="/" element={<UserList setEditingIndex={setEditingIndex} data={data} setActiveIndex={setActiveIndex} />} />
            <Route path="/form" element={<Form setData={setData} setActiveIndex={setActiveIndex} />} />
          </Routes>
        </animated.div>
      ))}
    </div>
  );
}

export default App;
