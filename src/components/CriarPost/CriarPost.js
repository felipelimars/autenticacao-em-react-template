import React from 'react'
import { FormPost, Input, TextArea } from './styled'
import useForms from '../../hooks/useForms'
import axios from 'axios'
import { BASE_URL } from '../../constants/BASE_URL'

export default function CriarPost() {

  const { form, onChange, limparCampos } = useForms(
    {
      titulo: '',
      post: ''
    }
  )

  
  const enviarPost = (e) => {
    e.preventDefault()
    
    console.log("entrou")

    const token = localStorage.getItem('token')

    const body = {
      title: form.titulo,
      body: form.post
    }
  
    const headers = {
      headers: {
        Authorization: token
      }
    }

    axios.post(`${BASE_URL}/posts`, body, headers)
    .then((resp)=>{
      console.log(resp);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <FormPost onSubmit={enviarPost}>
      <label htmlFor='tituloPost'>Título:</label>
      <Input
        name='titulo'
        value={form.titulo}
        onChange={onChange}
        placeholder='digite um título para o seu post'
      />
      <label htmlFor='textoPost'>Texto:</label>
      <TextArea 
      name='post'
      value={form.post}
      onChange={onChange}
      placeholder='crie um post!' 
      />
      <button>Enviar</button>
    </FormPost>
  )
}
