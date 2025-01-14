import { html } from "https://npm.reversehttp.com/preact,preact/hooks,htm/preact,preact-render-to-string"

const Layout = ({ navColor, navLink, children }) => {
  return html`
    <nav style=${navStyle(navColor)}>
      <div class="container align-center">
        <img height="200px" width="1000px" style="max-width:100%; margin: 1rem;" src="/assets/logo_dark_alpha.webp" alt="peko-chick" />  
        <h1 style="text-align: center;">Featherweight <a href="/${navLink}" style=${navLinkStyle}>apps</a> on the stateless edge</h1>
      </div>
    </nav>
    <main style="padding: 1rem;" class="container">
      ${children}
    </main>
    <footer style=${footerStyle}>
      <div class="container row">
        <a style=${footerLinkStyle} href="https://github.com/sebringrose/peko">
          <img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" width=100 height=100 alt=GitHub/>
          Source repo
        </a>
        <a class="align-center" style=${footerLinkStyle} href="https://doc.deno.land/https://deno.land/x/peko/mod.ts">
          <img src="https://raw.githubusercontent.com/denolib/high-res-deno-logo/master/deno_hr_circle.svg" width=100 height=100 alt=Deno />
          API docs
        </a>
      </div>
      <div class="container row">
        <a style=${footerLinkStyle} href="/">Home</a>
        <a style=${footerLinkStyle} href="/about">About</a>
      </div>
      <p style="margin: 10px; text-align: center">Made by <a href="https://thesebsite.com">Seb R</a></p>
    </footer>
  `   
}

const navStyle = (navColor) => `
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  background-color: ${navColor};
  padding-bottom: 20px;
`

const navLinkStyle = `
  color: white;
`

const footerStyle = `
  padding-top: 20px;
`

const footerLinkStyle = `
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  padding: 0px 5px;
  margin-bottom: 1rem;
`
  
export default Layout
