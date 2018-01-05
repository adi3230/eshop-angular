import { EshopAngularPage } from './app.po';

describe('eshop-angular App', () => {
  let page: EshopAngularPage;

  beforeEach(() => {
    page = new EshopAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
