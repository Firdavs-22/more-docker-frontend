export const getAvatar = (number) => {
  return `mdi-${icons[number % icons.length]}`
}

export const getColor = (number) => {
  return colors[number % colors.length]
}

const icons = [
  'account',
  'account-outline',
  'account-cowboy-hat',
  'account-cowboy-hat-outline',
  'account-hard-hat-outline',
  'account-hard-hat',
  'account-school-outline',
  'account-school',
  'account-tie-hat-outline',
  'account-tie-hat',
  'account-tie-outline',
  'account-tie',
  'account-tie-woman',
]

const colors = [
  'red',
  'green',
  'blue',
  'yellow',
  'purple',
  'pink',
  'orange',
  'indigo',
  'teal',
  'cyan',
  'brown',
  'grey',
]
