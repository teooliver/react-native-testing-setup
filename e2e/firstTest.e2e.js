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

  it('should show error message and alert if input doesnt pass validation', async () => {
    await element(by.text('Sign In')).tap();
    await expect(element(by.text('Login'))).toBeVisible();
    await expect(element(by.text('Your Email'))).toBeVisible();
    await expect(element(by.text('Your Password'))).toBeVisible();
    await element(by.text('Log In')).tap();
    await expect(element(by.text('Wrong Input!'))).toBeVisible();
    await element(by.text('Okay')).tap();
    await element(by.id('emailInput')).typeText('t');
    await expect(
      element(by.text('Username must be 4 characters long'))
    ).toBeVisible();
    await element(by.id('passwordInput')).typeText('123');
    await expect(
      element(by.text('Password must be 8 characters long'))
    ).toBeVisible();
    await element(by.text('Log In')).tap();
    await expect(element(by.text('Invalid User!'))).toBeVisible();
    await element(by.text('Okay')).tap();
  });

  it('User Journey 01', async () => {
    await element(by.text('Sign In')).tap();
    await expect(element(by.text('Login'))).toBeVisible();
    await expect(element(by.text('Your Email'))).toBeVisible();
    await expect(element(by.text('Your Password'))).toBeVisible();
    await element(by.id('emailInput')).typeText('teo@test.com');
    await element(by.id('passwordInput')).typeText('123qweasd');
    await element(by.text('Log In')).tap();
    await expect(element(by.id('Home'))).toBeVisible();
    await element(by.id('search-tab')).tap();
    await expect(element(by.text('Search'))).toBeVisible();
    await element(by.id('home-tab')).tap();
    await expect(element(by.id('Home'))).toBeVisible();
    await expect(element(by.id('carousel-id'))).toBeVisible();
    await element(by.id('carousel-id')).scrollTo('right');
    await expect(element(by.id('last-carousel-item'))).toBeVisible();
    await element(by.id('last-carousel-item')).tap();
    await expect(element(by.id('share-icon'))).toBeVisible();
    await element(by.id('share-icon')).tap();
    await expect(element(by.text('Modal'))).toBeVisible();
    await element(by.id('share-modal')).swipe('down', 'fast');
    await element(by.id('navigate-back-btn')).tap();
    await expect(element(by.id('Home'))).toBeVisible();
  });
});
