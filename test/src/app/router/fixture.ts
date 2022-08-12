import Controller from '../../../../src/app/lib/controller/controller';
import Logger from '../../../../src/app/lib/logger';
import router from '../../../../src/app/lib/router';

class Stub extends Controller {
  get() {
    return Promise.resolve(this);
  }
}

export default () => {
  const route = router(new Stub({ logger: new Logger({ root: __dirname }) }));

  return ({
    route
  });
};
