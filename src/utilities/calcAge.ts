export const calcAge = (input: string | Date) => {
  const birthday = typeof input === 'string' ? new Date(input) : input
  const today = new Date()
  const thisYearsBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate())
  const age = today.getFullYear() - birthday.getFullYear()

  return today < thisYearsBirthday ? age - 1 : age
}
