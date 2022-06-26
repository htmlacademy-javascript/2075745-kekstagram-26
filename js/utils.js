export function getRandom(min, max) {
  min = Math.round(Math.abs(+min));
  max = Math.round(Math.abs(+max));
  [min, max] = max < min ? [max, min] : [min, max];
  if (!(min && max)) { return false; };
  console.log(`Min ${min}; Max ${max}`);
  return Math.round(Math.random() * (max - min) + min);
}

let checkLength = (anyString, maxLength) => (anyString.length <= maxLength);

export function getRandomBooking(min, max, numberOfPoints) {
  const rank = Math.pow(10, numberOfPoints);
  min = Math.round(Math.abs(+min) * rank);
  max = Math.round(Math.abs(+max) * rank);
  [min, max] = max < min ? [max, min] : [min, max];
  if (!(min && max)) { return false; };
  console.log(`Min ${min / rank}; Max ${max / rank}`);
  return Math.round(Math.random() * (max - min) + min) / rank;
}
