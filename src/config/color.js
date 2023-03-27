const getColor = (mag) => {
    if (mag >= -2 && mag < -1) return "white";
    if (mag >= -1 && mag < 0) return "blue";
    if (mag >= 0 && mag < 1) return "black";
    if (mag >= 1 && mag < 2) return "steelblue";
    if (mag >= 2 && mag < 3) return "pink";
    if (mag >= 3 && mag < 4) return "yellow";
    if (mag >= 4 && mag < 5) return "orange";
    if (mag >= 5 && mag < 6) return "red";
    return "gray";
  };

export default getColor;