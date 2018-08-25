export default keys => state => {
  if (typeof keys === 'function') return {...state, ...keys(state)}
  return ({...state, ...keys})
}