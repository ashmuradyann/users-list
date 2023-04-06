import { useState, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';

import UserList from './components/user-list/UserList';
import Form from './components/form/Form';

function App() {
  const prevIndexRef = useRef(-1);
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
    onRest: () => {
      prevIndexRef.current = activeIndex;
    },
  });

  return (
    <div className="app">
      {transitions((props, item) => (
        <animated.div style={props} className="slide">
          <Routes location={item}>
            <Route path="/" element={<UserList setActiveIndex={setActiveIndex} />} />
            <Route path="/form" element={<Form setActiveIndex={setActiveIndex} />} />
          </Routes>
        </animated.div>
      ))}
    </div>
  );
}

export default App;