import Document, {Head, Main, NextScript} from 'next/document'
import {Helmet} from 'react-helmet'
import {ServerStyleSheet} from 'styled-components'

interface Props {
  helmet: any,
  styleTags: any,
}

export default class extends Document {
  props: Props

  static getInitialProps ({renderPage}) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    const helmet = Helmet.renderStatic()
    return {...page, helmet, styleTags}
  }

  render () {
    return (
      <html>
        <Head>
          {this.props.helmet.title.toComponent()}
          {this.props.helmet.meta.toComponent()}
          {this.props.helmet.link.toComponent()}
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}