const TO_MILISECONDS = 1000;

const isTokenExpired = (expiredDate) => {
  if (!expiredDate) return true;

  return Date.now() > expireDate * TO_MILISECONDS;
};
