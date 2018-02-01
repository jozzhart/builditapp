import { AppPage } from './app.po';

describe('buildit App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Chamonix 5 day weather forecast');
  });
});
