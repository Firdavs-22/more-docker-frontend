export const getAvatar = (number) => {
  return `mdi-${icons[number % icons.length]}`
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
