const CHARACTERS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
}

function getRandomPassword(passwordSettings) {
  const randomPassword = [];
  const includesArray = Object.entries(passwordSettings).reduce((acc, [key, value]) => {
    if (key !== 'length' && value) acc.push(key);
    return acc;
  }, []);

  if (includesArray.length === 0) return undefined;

  for (let i = 0; i < passwordSettings.length; i += 1) {
    const randomInclude = Math.floor(Math.random() * includesArray.length);
    const randomChar = Math.floor(Math.random() * CHARACTERS[includesArray[randomInclude]].length);
    randomPassword.push(CHARACTERS[includesArray[randomInclude]][randomChar]);
  }

  return randomPassword.join('');
}

export default getRandomPassword;
