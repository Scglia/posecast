import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Queue = () => {
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsOpen(!isOpen);
  //   }, 1000);
  // }, []);

  return (
    <motion.div
      layout
      initial={{ y: -50, opacity: 0 }}
      style={{
        height: "300px",
        width: "100%",
        backgroundColor: "red",
        display: isOpen ? "block" : "none",
        opacity: isOpen ? 1 : 0,
      }}
    >
      Test
    </motion.div>
  );
};

export default Queue;
