export default function validateTwoDecimalNum(n) {
  const re = /^\s*?[0-9]\d*(\.\d{1,2})?\s*$/
  return re.test(n)
}
