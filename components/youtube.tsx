export default props => <iframe 
  width={props.width || '560'} 
  height={props.height || '315'} 
  src={`https://www.youtube.com/embed/${props.id}?autoplay=1`}
  frameBorder='0' 
  allowFullScreen 
/>