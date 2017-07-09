import { Recipemanager.ClientPage } from './app.po';

describe('recipemanager.client App', () => {
  let page: Recipemanager.ClientPage;

  beforeEach(() => {
    page = new Recipemanager.ClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
