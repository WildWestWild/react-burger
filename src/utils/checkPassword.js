export function checkPassword(password) {
  const passwordRegex = /^.*{6,}$/;
  return passwordRegex.test(password);
}
