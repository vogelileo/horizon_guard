const intruderRadar = (radar) => {
  return radar === true;
};

const intruderVibration = (x_old, y_old, z_old, x_new, y__new, z_new) => {
  let dx = x_new - x_old;
  let dy = y_new - y_old;
  let dz = z_new - z_old;
  return Math.sqrt(dx * dx + dy * dy + dz * dz) > 30;
};

const intruderThermal = (thermalImageold, thermalImagenew) => {};

export { intruderRadar, intruderVibration, intruderThermal };