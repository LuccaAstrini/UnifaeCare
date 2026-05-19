jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn().mockResolvedValue(null),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

import ApiService from '../src/services/api';
const SecureStore = require('expo-secure-store');

jest.setTimeout(15000);

const TEST_EMAIL = 'giovana.sagioratto@sou.fae.br';
const TEST_PASSWORD = 'Admin@123';

beforeAll(async () => {
  const result = await ApiService.login(TEST_EMAIL, TEST_PASSWORD);
  console.log(result);
  SecureStore.getItemAsync.mockResolvedValue(result.token);
});

describe('ApiService', () => {
  describe('login', () => {
    it('throws on invalid credentials', async () => {
      await expect(
        ApiService.login('invalid@email.com', 'wrongpass')
      ).rejects.toThrow();
    });
  });

  describe('getHomeInfo', () => {
    it('gets /app/home', async () => {
      const result = await ApiService.getHomeInfo();
      console.log(result);
    });
  });
});
