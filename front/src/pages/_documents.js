import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head title='Marmitech' />
      <body className='bg-neutral-100'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}