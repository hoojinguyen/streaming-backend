export default function(array: any[]) {
  if (!array) return null
  return array[Math.floor((Math.random() * array.length))]
}