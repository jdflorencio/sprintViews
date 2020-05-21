import template from './Home.html'

function HomeController($http, HomeService, $state, $scope) {
  self = this
  
  HomeService.getAll()
  

  

}

export const HomeComponent = {
  controller: HomeController,
  controllerAs: 'ctrl',
  template
}