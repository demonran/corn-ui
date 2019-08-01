import RouteView from '@/layouts/RouteView';
import teacher from './teachers';
import category from './category';

export default {
  routes: ParseConfigs([teacher,category]),
  configs: { teacher, category}
};

function ParseConfigs (cfgs) {
  let routes = cfgs.map(item => CreateRouters(item));
  return routes;
}

function CreateRouters (cfg) {
  let route = {
    path: cfg.path,
    name: cfg.name,
    component: RouteView,
    icon: 'table',
    children: [
    ]
  };

  if (cfg.route.list) {
    let page = cfg.route.list;
    route.children.push({name: page.name,
      path: page.path,
      icon: 'none',
      component: () => import('@/pages/table/list'),
      props: {
        config: page.config, route: cfg.route, dbname: cfg.dbname, dbid: cfg.dbidField, cols: cfg.cols
      }});
  }
  if (cfg.route.add) {
    let page = cfg.route.add;
    route.children.push({name: page.name,
      path: page.path,
      icon: 'none',
      invisible:page.invisible,
      component: () => import('@/pages/table/add'),
      props: {
        config: page.config,
        route: cfg.route,
        dbname: cfg.dbname,
        dbid: cfg.dbidField,
        cols: cfg.cols
      }});
  }
  if (cfg.route.update) {
    let page = cfg.route.update;
    route.children.push({name: page.name,
      invisible: true,
      path: page.path,
      icon: 'none',
      component: () => import('@/pages/table/update'),
      props: {
        config: page.config,
        route: cfg.route,
        path: page.path,
        dbname: cfg.dbname,
        dbid: cfg.dbidField,
        cols: cfg.cols
      }});
  }

  return {parent: cfg.parent, route};
}
