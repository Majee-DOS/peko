export default ({ pageTitle }) => (_request, _html, _script, _style) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" href="/assets/favicon.ico">
        <title>Peko ${pageTitle ? `| ${pageTitle}` : ""}</title>
        <meta name="description" content="The featherweight Deno Preact SSR app toolkit.">
        <meta name="keywords" content="site, description">
        <style>
            html, body {
                height: 100%;
                width: 100%;
                margin: 0;
                font-family: helvetica;
            }
            
            img { max-width: 100%; }
            li { margin: 10px 0; }
            a { color: royalblue; }
            a:visited { color: hotpink; }
            .container { max-width: 900px; margin: auto; }
            .row { display: flex; }
            .justify-around { justify-content: space-around; }

            .btn-lg-primary {
                border: solid 1px limegreen;
                background-color: turquoise;
                padding: 0.5rem;
                font-size: 1rem;
            }
            
            .btn-lg-secondary {
                border: solid 1px red;
                background-color: orange;
                padding: 0.5rem;
                font-size: 1rem;
            }
        </style>
    </head>
    <body>
        <div id="root">
            ${_html}
        </div>
        ${_script}
    </body>
    </html>
`