import {
  database
} from './../../firebase'

const HomeService = 'homeService'
angular.module(HomeService, []).factory('HomeService', function ($http, $firebaseArray) {

  const services = {}
  let pesoTotal = 0


  const addSprint = function (data, current_sprint) {

    const {
      cards,
      sprints,
      tamanho,
      complexidade,
      situacao
    } = data


    cards[`${current_sprint}`].length
    
    database.ref('scrum/cards').update(cards)
    database.ref('scrum/sprints').update(sprints)
    database.ref('scrum/config').update(tamanho)
    database.ref('scrum/config').update(complexidade)
    database.ref('scrum/config').update(situacao)

    database.ref('scrum/sprints/' + current_sprint ).update({pesoTotal})
    database.ref('scrum/sprints/' + current_sprint ).update({tarefas: cards[`${current_sprint}`].length})

    pesoTotal = 0
    
  }

  services.getJson = function (stringJson) {

    try {

      let obj = JSON.parse(stringJson)
      const cabecalho = {
        // id: obj.id,
        name: obj.name,
        // desc: obj.desc,
        descData: obj.descData,
        closed: obj.closed,
        idOrganization: obj.idOrganization,
        shortLink: obj.shortLink,
        // powerUps: obj.powerUps,
        // dateLastActivity: obj.dateLastActivity,
        // idTags: obj.idTags,
        // datePluginDisable: obj.datePluginDisable,
        // creationMethod: obj.creationMethod,
        // idBoardSource: obj.idBoardSource,
        // idEnterprise: obj.idEnterprise,
        // pinned: obj.pinned,
        // starred: obj.starred,
        // url: obj.url,
        shortUrl: obj.shortUrl,
        // ixUpdate: obj.ixUpdate
      }

      const {
        cards,
        members,
        customFields,
        prefs,
        actions,
        labels,
        lists,
        checklists,
        limits,
        labelNames
      } = obj

      const data = {}
      const sprint = {}
      const listcards = {}



      /* MEMBROS DA SPRINT */
      // const dataMembers = []
      // members.map(member => {
      //   dataMembers.push({id: member.id, nome: member.fullName})

      // })

      const cardsCustum = []
      const totalCustomFilds = []
      listcards[`${cabecalho.name}`] = cardsCustum

      const tamanhoValues = {
        "PP": 0.5,
        "P": 1.5,
        "M": 2.5,
        "G": 4,
        "GG": 6,
        "EG": 6
      }

      const tamanho = []
      customFields[1].options.map(item => {
        tamanho.push({
          id: item.id,
          idCustumFiel: item.idCustomField,
          descricao: item.value.text,
          valor: tamanhoValues[item.value.text]
        })
      })

      const complexidade = []
      customFields[0].options.map(item => {
        complexidade.push({
          id: item.id,
          idCustumFiel: item.idCustomField,
          descricao: item.value.text,
          valor: item.value.text
        })
      })

      data.tamanho = {
        tamanho
      }
      data.complexidade = {
        complexidade
      }

      const situacao = {}

      lists.map(list => {
        const name = list.name.split(' ')[0]

        situacao[`${name}`] = [{
          id: list.id,
          descricao: list.name
        }]
      })

      complexidade.map(comp => {
        totalCustomFilds.push(comp)
      })

      tamanho.map(tam => {
        totalCustomFilds.push(tam)
      })

      // return false

      // *** motando o card
      cards.map(card => {
        const participantes = []

        // PARTICIPANTES DOS CARDS
        card.idMembers.map(member => {
          members.filter(mem => {
            if (member == mem.id) {
              participantes.push({
                id: mem.id,
                nome: mem.fullName
              })
            }
          })
        })

        let situacaoValue = lists.filter(list => {
          if (card.idList == list.id)
            return list.name
        })

        const field = {}
        const fieldCustom = card.customFieldItems.map(item => {

          if (item.idValue) {
            const valorEncontrado = totalCustomFilds.filter(field => {

              return field.idCustumFiel == item.idCustomField && field.id == item.idValue
            })

            if (Number.isInteger(parseInt(valorEncontrado[0].descricao))) {

              field.complexidade = valorEncontrado[0].descricao
            } else if (!Number.isInteger(parseInt(valorEncontrado[0].descricao)) && valorEncontrado[0].descricao != void 0) {

              field.tamanho = valorEncontrado[0].descricao
            }
          }

        })

        pesoTotal += tamanhoValues[`${field.tamanho}`] * field.complexidade || 0

        cardsCustum.push({
          titulo: card.name,
          descricao: card.desc,
          link: card.shortUrl,
          tamanho: field.tamanho || '',
          complexidade: field.complexidade || '',
          situacao: situacaoValue[0].name.split(' ')[0],
          peso: tamanhoValues[`${field.tamanho}`] * field.complexidade || 0,
          participantes
        })
      })


      sprint[`${cabecalho.name}`] = {
        titulo: cabecalho.name,
        link: cabecalho.shortUrl,
        membros: members.length
        // totalPesos: 50

      }

      data.sprints = sprint
      data.cards = listcards
      data.situacao = {
        situacao
      }


      addSprint(data, cabecalho.name)
      return true

    } catch (error) {
      console.warn(error)
      return error
    }

  }


  return services
})

export default HomeService