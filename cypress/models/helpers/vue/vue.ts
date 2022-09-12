import VueRoute from './router/vue-route';

export default interface Vue {
  $route: VueRoute;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [property: string]: any;
}
