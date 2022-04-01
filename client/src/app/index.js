import { routes as dashboard } from './dashboard';
import { routes as users } from './users';
import { routes as items } from './items';
import { routes as auth } from './auth';
import { routes as profile } from './profile';

export default [...auth, ...dashboard, ...users, ...items, ...profile];
