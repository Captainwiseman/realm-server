export function validateNumberOfPlayers(numberOfPlayers, maximumSize) {
  const numberfyNumberOfPlayers = Number(numberOfPlayers);
  if (
    numberfyNumberOfPlayers !== NaN &&
    numberfyNumberOfPlayers > 2 &&
    numberfyNumberOfPlayers < maximumSize
  ) {
    return numberfyNumberOfPlayers;
  } else {
    return false;
  }
}
