const StaticsService = 'staticsService'
angular.module(StaticsService, [])
.factory('StaticsService', function($http){

    const services = {}

    services.getAll = function() {
      return {
          msg: "De Servicos", 
          status: 200
      }
    }
    return services    
})

export default StaticsService