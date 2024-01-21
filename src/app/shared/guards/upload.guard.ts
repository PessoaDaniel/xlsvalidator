import {CanActivateFn, Router} from '@angular/router';

export const UploadGuard: CanActivateFn = async (route, state) => {
  if (!window.localStorage.getItem('RULES')) {
    const router = new Router();
    await router.navigate(['/']);
    return false;
  }
  return true;
};
