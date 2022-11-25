import './style.css'
import '@picocss/pico'

const formConsultarPerfil = document.querySelector('#consultaPerfil')
const inputPerfil = formConsultarPerfil.perfil
const divDados = document.querySelector('#dados')
const btnConsultarPerfil = document.querySelector("#btnConsultarPerfil")


formConsultarPerfil.addEventListener('submit', function(event){
  event.preventDefault()

  ativaLoader(true)
  consultarPerfil(inputPerfil.value)
})


async function consultarPerfil(perfil){
  let response = await fetch(` https://api.github.com/users/${perfil}`)
  let dadosPerfil = await response.json()

if(dadosPerfil.erro){
  divDados.innerHTML = '<div class="erro">Perfil não encontrado!</div>'
}else{

divDados.innerHTML = `

  <span class = "circle-image"> <img src= ${dadosPerfil.avatar_url} /> </span>
  <p> ${dadosPerfil.name} </p>
  <a> <a href= ${dadosPerfil.url}>Perfil no Github </a>

`
}
ativaLoader(false)

}

function ativaLoader(ativo){
  if(ativo){
  divDados.setAttribute('arial-busy','true')
  divDados.textContent = 'Localizando Perfil, Aguarde...'
  }else{
    divDados.removeAttribute('aria-busy')
    
  }
}
