const LoginService = 'loginService'
angular.module(LoginService, [])
.factory('LoginService', function($http){

    const services = {}

    services.getAll = function() {
      return {
          msg: "De Servicos", 
          status: 200
      }
    }
    return services    
})

export default LoginService