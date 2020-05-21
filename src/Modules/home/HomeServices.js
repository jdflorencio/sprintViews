const HomeService = 'homeService'
angular.module(HomeService, [])
.factory('HomeService', function($http){

    const services = {}

    services.getAll = function() {
      return {
          msg: "De Servicos", 
          status: 200
      }
    }
    return services    
})

export default HomeService