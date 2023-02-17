const colors: string[] = [];

export const get = () => {
  return colors;
}

export const add = (color: string) => {
  colors.push(color);
  return colors
}