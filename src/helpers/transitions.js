import { useTransition } from "react-spring";
import { useLocation } from "react-router-dom";

const useTransitions = (activeIndex, prevIndexRef) => {
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
      transform: "translateX(0%)",
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

  return transitions;
};

export default useTransitions;
