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

    services.getJson = function(url) {
      return $http.get(url)
      .then( result =>  {
         if(result.status == 200) {
            console.log()
         }        
      })
      .catch( err => {
        console.warn(err)
      })
    }

    
    return services
})

export default HomeService