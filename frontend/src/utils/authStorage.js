export function saveToken(token) {
  localStorage.setItem("Bearer", token);
}

export function getToken() {
  return localStorage.getItem("Bearer");
}

export function logout() {
  localStorage.removeItem("Bearer");
}
