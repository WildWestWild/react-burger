export function checkPassword(password: string): boolean {
  const passwordRegex = /^.{6,}$/;
  return passwordRegex.test(password);
}
