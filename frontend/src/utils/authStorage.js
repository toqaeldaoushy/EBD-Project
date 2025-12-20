export function saveToken(token) {
  localStorage.setItem("cashly_token", token);
}

export function getToken() {
  return localStorage.getItem("cashly_token");
}

export function logout() {
  localStorage.removeItem("cashly_token");
}
