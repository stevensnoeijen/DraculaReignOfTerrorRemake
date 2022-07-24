export const getHealthColor = (percentage: number): number => {
  if (percentage >= 0.66) {
    return 0x00ff00;
  } else if (percentage >= 0.33) {
    return 0xffff00;
  } else {
    return 0xff0000;
  }
};
