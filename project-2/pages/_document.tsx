import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    static getInitialProps({ renderPage }: any) {
        // * step 1: create an instance of ServerStyleSheet
        const sheet = new ServerStyleSheet()

        // * step 2: retrieve styles from components in the page
        const page = renderPage(
            (App: any) => (props: any) => sheet.collectStyles(<App {...props} />)
        )

        // * step 3: extract the styles as <style> tags
        const styleTags = sheet.getStyleElement()

        // * step 4: pass styleTags as a prop
        return { ...page, styleTags }
    }

    render() {
        return (
            <html>
                <Head>
                    <title>My Page</title>
                    {/* step 5: output the styles in the head */}
                    { (this.props as any).styleTags }
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}