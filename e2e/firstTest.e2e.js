/* eslint-disable no-undef */

describe('Login Workflow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it.skip('should have welcome screen', async () => {
    await expect(element(by.text('Welcome'))).toBeVisible();
  });

  it.skip('should show Login screen on login button tap', async () => {
    await element(by.text('Sign In')).tap();
    await expect(element(by.text('Login'))).toBeVisible();
  });

  it('should login on username and password entry', async () => {
    await element(by.text('Sign In')).tap();
    await expect(element(by.text('Login'))).toBeVisible();
    await expect(element(by.text('Your Email'))).toBeVisible();
    await expect(element(by.text('Your Password'))).toBeVisible();
    await element(by.text('Log In')).tap();
    await expect(element(by.text('Wrong Input!'))).toBeVisible();
    await element(by.text('Okay')).tap();
    await element(by.id('emailInput')).typeText('teo@test.com');
    await element(by.id('passwordInput')).typeText('123qweasd');
    await element(by.text('Log In')).tap();
    await expect(element(by.id('Home'))).toBeVisible();
    await element(by.id('search-tab')).tap();
    await expect(element(by.text('Search'))).toBeVisible();
    await element(by.id('home-tab')).tap();
    await expect(element(by.id('Home'))).toBeVisible();
  });
});
