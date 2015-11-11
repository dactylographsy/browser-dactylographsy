import Dactylographsy from './dactylographsy';
import es6Promise from 'es6-promise';

es6Promise.polyfill();

if (typeof window !== 'undefined') {
  window.dactylographsy = new Dactylographsy({
    autorun: true
  });
}
