import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../constants/BASE_URL'
import axios from 'axios'



export default function useRequestData(estadoInicial, path, headers) {



    const [dados, setDados] = useState(estadoInicial)
    const [erro, setErro] = useState('')

    const receberDados = () =>{
        axios.get(`${BASE_URL}${path}`, headers)
        .then((resposta) => {
            setDados(resposta.data)
        })
        .catch((erro) => {
            console.log(erro.response)
            setErro(erro.response)
        })
    }
    
    useEffect(() => {
        receberDados()
    }, [path])

    return [dados, receberDados, erro]
}
