// eslint-disable-next-line
const Dashboard = r => require.ensure([], () => r(require('./main')), 'group-dashboard');
// eslint-disable-next-line
const Watch = r => require.ensure([], () => r(require('./components/watch')), 'group-items');
export default [
  {
    name: 'dashboard',
    path: '/',
    component: Dashboard,
    meta: { requiresAuth: true },
  }, {
    name: 'catchall',
    path: '*',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    name: 'watch',
    path: '/watch:_id',
    component: Watch,
    meta: { requiresAuth: true },
  },
];
