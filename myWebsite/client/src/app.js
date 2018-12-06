export class App {
  configureRouter(config, router) {
    this.router = router;
    config.map([
      {
        route: ['', 'home'],
        moduleId: './modules/components/home',
        name: 'Home'
      },
      {
        route: 'users',
        moduleId: './modules/components/users',
        name: ' Users'
      }
    ]);
  }
}

