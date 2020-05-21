function appService($state, $mdToast) {
    const appService = {}

    appService.notificacao = function (resp, message) {
        self.showSimpleToast = function (message) {
            const pinTo = "bottom"
            $mdToast.show(
                $mdToast.simple()
                .textContent(message)
                .position(pinTo)
                .hideDelay(3000))
        }

        console.log(resp)
        switch (resp) {
            case 200:
                self.showSimpleToast(message)
                break
            case 201:
                self.showSimpleToast('Recurso Criado!')
                break
            case 401:
                self.showSimpleToast('error 401')

                break
            case 403:
                self.showSimpleToast('error 403')

                break
            case 412:
                self.showSimpleToast('error 412')

                break
            case 204:
                self.showSimpleToast('error 204')
                break

        


        }
    }

    appService.notAuthenticated = function () {
        if (localStorage.getItem('Authorization')) {
            $state.go('login')
        }
    }
    return appService
}

export default appService