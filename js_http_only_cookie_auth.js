import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key_here';
const refreshSecretKey = 'your_refresh_secret_key_here';

export function generateAccessToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

export function generateRefreshToken(payload) {
  return jwt.sign(payload, refreshSecretKey, { expiresIn: '7d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}

export function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, refreshSecretKey);
  } catch (error) {
    return null;
  }
}

export function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;Secure;HttpOnly;SameSite=Strict`;
}

export function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

export function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;Secure;HttpOnly;SameSite=Strict`;
}
