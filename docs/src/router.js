import docConfig from './doc.config';
import componentDocs from './docs-entry';

const registerRoute = () => {
  const route = [{
    path: '*',
    redirect: to => `/intro`
  }];

  const navs = docConfig.nav || [];

  navs.forEach(nav => {
    if (nav.groups) {
      nav.groups.forEach(group => {
        group.list.forEach(page => addRoute(page));
      });
    } else {
      addRoute(nav);
    }
  });

  function addRoute(page) {
    let { path } = page;
    if (path) {
      path = path.replace('/', '');

      const component = componentDocs[`${path}`];

      if (!component) {
        return;
      }

      route.push({
        name: '/' + path,
        component,
        path: `/${path}`,
        meta: {
          path,
          name: page.title
        }
      });
    }
  }

  return route;
};

export default registerRoute;
