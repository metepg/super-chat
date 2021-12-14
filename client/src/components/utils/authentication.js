import { login, signup } from '../../api/auth';

/**
 * Helpperi käyttäjän autentikointiin
 *
 * @author Mete Güneysel
 */

/**
 * Tarkistaa tietokannasta täsmääkö syötetyt tiedot käyttäjän nimeen
 *
 * @param name käyttäjänimi
 * @param password käyttäjän salasana
 */
export const validateLogin = async (name, password) => {
  try {
    const { data } = await login({ name, password });
    return data;
  } catch (error) {
    alert(error.response.data.message);
    return null;
  }
};

/**
 *
 * @param name käyttäjänimi
 * @param password salasana
 *
 * Jos käyttäjänimi löytyy tietokannasta ilmoitetaan siitä käyttäjälle
 */
export const validateSignup = async (name, password) => {
  try {
    const { data } = await signup({ name, password });
    return data;
  } catch (error) {
    alert(error.response.data.message);
    return null;
  }
};
