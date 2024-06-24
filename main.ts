import './style.css'

const files = import.meta.glob('./pages/**');
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<div><ul id='pagelist'></ul></div>`
let set = new Set();
for (var key in files) {
  if (!key.includes('.html')) continue
  let name = key.split("/")[2];
  if (set.has(name)) continue
  set.add(name)
  const child = document.createElement('li')
  child.innerHTML = `<a href='${key}' target="_blank">${name}</a>`
  document.querySelector('#pagelist')?.appendChild(child)
}
set = null
