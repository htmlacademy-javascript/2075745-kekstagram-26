
export { getRandom, checkLength }

function getRandom(min, max) {
  min = Math.round(Math.abs(+min));
  max = Math.round(Math.abs(+max));
  [min, max] = max < min ? [max, min] : [min, max];
  if (!(min && max)) { return false; };
  console.log(`Min ${min}; Max ${max}`);
  return Math.round(Math.random() * (max - min) + min);
}

let checkLength = (anyString, maxLength) => (anyString.length <= maxLength);


