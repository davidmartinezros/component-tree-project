import { ComponentTreeProjectPage } from './app.po';

describe('component-tree-project App', function() {
  let page: ComponentTreeProjectPage;

  beforeEach(() => {
    page = new ComponentTreeProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
