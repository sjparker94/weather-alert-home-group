import * as React from 'react';
// import Head from 'next/head';
import { Helmet } from 'react-helmet';

export const SITE_TITLE = 'Fleet Portal Design';

const Meta: React.FC = () => (
    <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        {/* <link rel="shortcut icon" href="/images/favicon.png" /> */}
        <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
        />

        <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Round"
            rel="stylesheet"
        />
        <title>{SITE_TITLE}</title>
    </Helmet>
);

export default Meta;
