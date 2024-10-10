export default function isValidEmail(email) {
  if(!email || typeof email !== 'string' ) return false;

  const pattern = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+[.][A-Z]{2,}$", "i");

  return pattern.test(email?.toLowerCase()?.trim());
}