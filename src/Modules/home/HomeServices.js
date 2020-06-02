import {
  database
} from './../../firebase'

const HomeService = 'homeService'
angular.module(HomeService, []).factory('HomeService', function ($http, $firebaseArray) {

  const services = {}
  let pesoTotal = 0

  const tamanhoValues = {
    "PP": 0.5,
    "P": 1.5,
    "M": 2.5,
    "G": 4,
    "GG": 6,
    "EG": 6
  }

  const optionsSituacao = {
    Retorno: 'Concluido',
    Teste: 'Concluido',
    Aguardando: 'Concluido',
    Concluido: 'Concluido',
    Publicado: 'Concluido',

    Bloqueado: 'Backlog',
    Backlog: 'Backlog',

    Andamento: 'Andamento',

  }

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

    database.ref('scrum/sprints/' + current_sprint).update({
      pesoTotal
    })
    database.ref('scrum/sprints/' + current_sprint).update({
      tarefas: cards[`${current_sprint}`].length
    })
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

      const totalCustomFilds = []

      const tamanho = _tamanho(customFields[1].options)
      const complexidade = _complexidade(customFields[0].options)
      
      data.tamanho = {
        tamanho
      }
      data.complexidade = {
        complexidade
      }

      const situacao = {}
      lists.map(list => {


        if (list.name == 'Concluído') {
          list.name = list.name.replace('Concluído', 'Concluido')
        }

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

      let cardsCustum = _criando_card(cards, lists, totalCustomFilds)
      listcards[`${cabecalho.name}`] = cardsCustum


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

  const _complexidade = function (comp) {
    const complexidade = []
    comp.map(item => {
      complexidade.push({
        id: item.id,
        idCustumFiel: item.idCustomField,
        descricao: item.value.text,
        valor: item.value.text
      })
    })

    return complexidade
  }

  const _tamanho = function (tam) {
    const tamanho = []
    tam.map(item => {
      tamanho.push({
        id: item.id,
        idCustumFiel: item.idCustomField,
        descricao: item.value.text,
        valor: tamanhoValues[item.value.text]
      })
    })
    return tamanho
  }

  const _participantes_cards = function (members) {
    if (!members.length) {
      console.warn("esta vazio")
      return false
    }
    const participantes = []
    members.map(member => {
      members.filter(mem => {
        if (member == mem.id) {
          participantes.push({
            id: mem.id,
            nome: mem.fullName
          })
        }
      })
    })

    return participantes
  }

  const _criando_card = function (cards, lists, totalCustomFilds) {
    const cardsCustum = []
    cards.map(card => {

      let participantes = _participantes_cards(card.idMembers)

      let situacaoValue = lists.filter(list => {
        if (card.idList == list.id)
          return list.name
      })

      const field = {}
      card.customFieldItems.map(item => {

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

      let nameSituacao = situacaoValue[0].name.split(' ')[0]

      if (nameSituacao == 'Concluído') {
        nameSituacao = nameSituacao.replace('Concluído', 'Concluido')
      }

      pesoTotal += tamanhoValues[`${field.tamanho}`] * field.complexidade || 0

      cardsCustum.push({
        titulo: card.name,
        descricao: card.desc,
        link: card.shortUrl,
        tamanho: field.tamanho || '',
        complexidade: field.complexidade || '',
        situacao: optionsSituacao[`${nameSituacao}`],
        peso: tamanhoValues[`${field.tamanho}`] * field.complexidade || 0,
        participantes
      })
    })

    return cardsCustum
  }


  return services
})

export default HomeService