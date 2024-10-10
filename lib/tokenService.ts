// lib/tokenService.ts
import axios from 'axios';

export async function fetchAccessToken() {
  try {
    const response = await axios.get('http://localhost:4000/api/public/token-generate');
    const { token } = response.data;
    localStorage.setItem('accessToken', token);
    return token;
  } catch (error) {
    console.error('Failed to fetch access token:', error);
    throw error;
  }
}
