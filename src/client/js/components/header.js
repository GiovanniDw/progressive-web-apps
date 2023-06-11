import Logo from '../../assets/Logo.png'
import { $, $$ } from '../ui.js'

const header = $('#main-header');

export async function Header() {
  const html = /*html*/`
    <nav>
      <a class="logo" href="/SPA/">
        <img src="${Logo}" alt="" />
      </a>
      <a href="/SPA/#art">Art</a>
      <a href="/SPA/#search">Search</a>
    </nav>
  `;
header.insertAdjacentHTML('afterbegin', html)  
}