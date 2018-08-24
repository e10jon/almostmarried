import * as ReactModal from 'react-modal'

ReactModal.setAppElement('#__next')

const parentSelector = () => document.querySelector('#modal')

export default props => <ReactModal {...props} parentSelector={parentSelector} />