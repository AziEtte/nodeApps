export class App {
  configureRouter(config, router) {
    this.router = router;
    config.map([
      {
        route: ['', 'foos'],
        moduleId: './modules/foos',
        name: ' foos'
      },
      {
        route: 'home',
        moduleId: './modules/home',
        name: 'Home'
      }
      // {
      //   route: 'foos',
      //   moduleId: './modules/foos',
      //   name: ' Foos'
      // }
      
      
    ]);
  }
}

