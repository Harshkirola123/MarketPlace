export const pageAnimation = {
  exit: {
    opacity: 0,
    scale: 1.1,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
  hidden: { opacity: 0.9, scale: 1 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

export const textAnimation = {
  exit: {
    y: -50,
    opacity: 0,
    transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 },
  },
  hidden: { y: 50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 },
  },
};

export const formVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  exit: { opacity: 0, y: -50, transition: { duration: 1 } },
};

export const updatedTextAnimation = {
  exit: {
    y: -30,
    opacity: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeInOut" },
  },
};
