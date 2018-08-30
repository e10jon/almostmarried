export default () => {
  const {GOOGLE_ANALYTICS_TRACKING_ID} = process.env
  if (!GOOGLE_ANALYTICS_TRACKING_ID) return null

  const __html = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GOOGLE_ANALYTICS_TRACKING_ID}');
  `

  return <>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_TRACKING_ID}`} />
    <script dangerouslySetInnerHTML={{__html}} />
  </>
}
