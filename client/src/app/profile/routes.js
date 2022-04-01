/* eslint-disable global-require */
const Main = r => require.ensure([], () => r(require('./main')), 'group-profile');

export default [{
  name: 'profile',
  path: '/profile',
  component: Main,
  meta: { requiresAuth: true },
}];
