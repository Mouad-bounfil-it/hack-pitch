const levels = ["A1", "A2", "B1", "B2", "C1"];

const typeColorLevel = {
    A1: "pink",   // Light pink
    A2: "purple", // Light purple
    B1: "indigo", // Light indigo
    B2: "blue",   // Light blue
    C1: "teal",  // Light teal
  };

  const typeColorMapping: { [key: string]: string } = {
    A1: "bg-pink-300 text-white",
    A2: "bg-purple-300 text-white",
    B1: "bg-indigo-300 text-white",
    B2: "bg-blue-300 text-white",
    C1: "bg-teal-300 text-white",
  };
  


export { levels, typeColorLevel,typeColorMapping };