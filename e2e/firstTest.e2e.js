/* eslint-disable no-undef */

describe('Login Workflow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.text('Welcome'))).toBeVisible();
  });

  it('should show Login screen on login button tap', async () => {
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
  });
});
