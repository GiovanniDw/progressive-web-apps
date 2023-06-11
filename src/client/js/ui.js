

export function updateUI(route, id) {
  const sections = $$('section');
  const articles = $$('article');

  // const activeArticle = $(`#${id}`);
  const activeSection = $(`[data-route=${route}]`);

  // console.log(activeArticle)

  // articles.forEach(article => {
  //   article.classList.remove('active')
  // })
  // activeArticle.classList.add('active')


  sections.forEach(section => {
    section.classList.remove('active')
  });
  activeSection.classList.add('active')
}

export function $(element) {
  return document.querySelector(element)
}

export function $$(elements) {
  return document.querySelectorAll(elements)
}

