import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://unpkg.com/cloudinary-video-player/dist/cld-video-player.min.css"
            rel="stylesheet"
          />
          <script
            src="https://unpkg.com/cloudinary-core/cloudinary-core-shrinkwrap.min.js"
            type="text/javascript"
          />
          <script
            src="https://unpkg.com/cloudinary-video-player/dist/cld-video-player.min.js"
            type="text/javascript"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
