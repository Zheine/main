import initialState from '../initialState'
import clone from 'clone'


const reducer = (state = initialState, { type, payload = {} }) => {
  const newState = clone(state)
  switch (type) {
    case 'START_QUIZ':
      newState.startedQuiz = true
      return newState
      break;
    case 'ANSWER_QUESTION':
      var existingAnswer = newState.results.filter(elem => elem.id === newState.quizPosition +1)
      if (existingAnswer.length !== 0) {
        newState.results[newState.quizPosition].answer = payload
      } else {
        newState.results.push({id: newState.quizPosition +1, answer: payload, statement: newState.questions[newState.quizPosition].statement})
      }
      return newState
      break;
    case 'NAVIGATE':
      newState.quizPosition += payload
      return newState
      break;
    case 'FINISH_QUIZ':
      newState.finishedQuiz = true
      return newState
      break;
    case 'START_OVER':
      newState.startedQuiz = false
      newState.finishedQuiz = false
      newState.results = []
      newState.quizPosition = 0
      return newState
      break;
    default:
      return newState
  }
}

export default reducer
