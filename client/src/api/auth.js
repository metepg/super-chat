import axios from 'axios';
/**
 * Tämä hoitaa käyttäjien autentikointiin liittyvät toimenpiteet
 * @author Mete Güneysel
 */
const URL = '/auth';

export const signup = (userData) => axios.post(`${URL}/signup`, userData);
export const login = (userData) => axios.post(`${URL}/login`, userData);
