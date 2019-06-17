import { dropTables } from '../../src/services/db';


after(() => {
  console.log('dropping tables');
  dropTables();
});
