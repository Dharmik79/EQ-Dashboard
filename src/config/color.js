const getColor = (mag) => {
    if (mag >= -2 && mag < -1) return "#e41a1c";
    if (mag >= -1 && mag < 0) return "#a6cee3";
    if (mag >= 0 && mag < 1) return "#4daf4a";
    if (mag >= 1 && mag < 2) return "#984ea3";
    if (mag >= 2 && mag < 3) return "#ff7f00";
    if (mag >= 3 && mag < 4) return "#1f78b4";
    if (mag >= 4 && mag < 5) return "#a65628";
    if (mag >= 5 && mag < 6) return "#f781bf";
    return "gray";
  };

export default getColor;