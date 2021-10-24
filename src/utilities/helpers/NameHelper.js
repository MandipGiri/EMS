export const getInitials = (name) => {
  let temp = name.split(" ");
  return temp.length ? temp[0].charAt(0).toUpperCase() : "";
  // return temp.length >= 2
  //   ? temp[0].charAt(0).toUpperCase() + "" + temp[1].charAt(0).toUpperCase()
  //   : temp[0].charAt(0).toUpperCase();
};
