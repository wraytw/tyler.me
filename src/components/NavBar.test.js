import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';

jest.mock('react-bootstrap/lib/Grid', () => ({ children }) => children);
jest.mock('react-bootstrap/lib/Row', () => ({ children }) => children);
jest.mock('react-bootstrap/lib/Col', () => ({ children }) => children);
jest.mock('react-router-dom', () => ({
  Link: () => '<a></a>'
}));
jest.mock('../stores/NavStore', () => ({
  isSideNavOpen: true,
  navItems: [
    {
      name: 'test',
      href: 'http://test.com'
    }
  ],
  on(event, fn) {
    fn();
  }
}));
jest.mock('../actions/NavAction', () =>
  function mockNavAction() {
    return {
      openSideNavCalled: false,
      openSideNav() {
        this.openSideNavCalled = true;
      },
      closeSideNavCalled: false,
      closeSideNav() {
        this.closeSideNavCalled = true;
      }
    };
  }
);
jest.mock('../dispatcher', () => () => ({}));
jest.mock('./SideNav', () => () => '<div></div>');
jest.mock('./Hamburger', () => () => '<div></div>');

describe('Nav Bar', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NavBar />, div);
  });

  describe('#constructor', () => {
    it('should create a local NavAction instance', () => {
      const instance = new NavBar();

      expect(Object.keys(instance.navAction)).toEqual(['openSideNavCalled', 'openSideNav', 'closeSideNavCalled', 'closeSideNav']);
    });

    it('should set the component state', () => {
      const instance = new NavBar();

      expect(instance.state).toEqual({
        isSideNavOpen: true,
        navItems: [
          {
            name: 'test',
            href: 'http://test.com'
          }
        ]
      });
    });
  });

  describe('#toggleSideNav', () => {
    describe('when side nav is open', () => {
      it('should call the close side nav action', () => {
        const instance = new NavBar();

        instance.toggleSideNav();

        expect(instance.navAction.closeSideNavCalled).toEqual(true);
        instance.navAction.closeSideNavCalled = false;
      });
    });

    describe('when side nav is closed', () => {
      it('should call the close side nav action', () => {
        const instance = new NavBar();

        instance.state.isSideNavOpen = false;
        instance.toggleSideNav();

        expect(instance.navAction.openSideNavCalled).toEqual(true);
        instance.navAction.openSideNavCalled = false;
      });
    });
  });

  describe('#closeSideNav', () => {
    it('should call the close side nav action', () => {
      const instance = new NavBar();

      instance.closeSideNav();

      expect(instance.navAction.closeSideNavCalled).toEqual(true);
      instance.navAction.closeSideNavCalled = false;
    });
  });
});

