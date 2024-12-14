import * as Keychain from 'react-native-keychain';

export const saveCredentials = async (username: string, password: string) => {
  const result = await Keychain.setGenericPassword(username, password);
  console.log(result ? 'Credentials saved!' : 'Failed to save credentials.');
};

export const getCredentials = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log('Username:', credentials.username);
      console.log('Password:', credentials.password);
      return credentials;
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.error('Failed to access Keychain', error);
  }
};

export const deleteCredentials = async () => {
  const result = await Keychain.resetGenericPassword();
  console.log(result ? 'Credentials deleted!' : 'Failed to delete credentials.');
};
