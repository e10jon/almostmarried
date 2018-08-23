import * as ReactModal from 'react-modal'

ReactModal.setAppElement('#modal')

export default props => <>
  <div id='modal' />
  <ReactModal {...props} />
</>