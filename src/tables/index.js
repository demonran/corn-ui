import RouteView from '@/layouts/RouteView';
import teacher from './teachers';
import category from './category';
import classmgr from './class';
import student from './student';
import ListComp from '@/pages/table/list';
import AddComp from '@/pages/table/add';
import UpdateComp from '@/pages/table/update';

export default {
  routes: ParseConfigs([teacher,category,classmgr,student]),
  configs: { teacher, category,classmgr,student}
};

function ParseConfigs (cfgs) {
  let result = [];
  cfgs.forEach(cfg => {
     let routes = CreateRouters(cfg);
     routes.forEach(item=>{
       result.push(item);
     });
  });
  return result;
}

function CreateRouters (cfg) {
  let result = [];
  let routes = cfg.routes;
  let n = routes.length;
  const Comps = {
    list:ListComp,
    add:AddComp,
    update:UpdateComp
  };

  for( let i=0 ;i<n; i++)
  {
    let page = routes[i];

    result.push(
      {
        pos: {
          parent:page.parent, 
          pre:page.pre, 
          post:page.post
        },
        route: {
          name: page.name,
          children:page.children?page.children:null,
          path: page.path,
          invisible: page.invisible,
          icon: page.icon?page.icon:'none',
          component: typeof page.component == 'string'? Comps[page.component] : page.component,
          props: {
            config: page.config, 
            dbname: cfg.dbname, 
            route: cfg.routes,
            dbid: cfg.dbidField, 
            cols: cfg.cols
          }
        }
      });
  }
  return result;
}
