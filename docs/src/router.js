import docConfig from './doc.config';

const registerRoute = () => {
  const route = [
    {
      path: '*',
      redirect: to => `/intro`
    }
  ];

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

  function addRoute(page, isComponent) {
    let { path } = page;
    if (path) {
      path = path.replace('/', '');

      const component = () =>
        page.md
          ? import(`../markdown/${path}.md`)
          : import(`../../packages/${path}/README.md`);

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
