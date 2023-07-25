import React from 'react'
import useForms from '../../hooks/useForms'
import { ContainerForm, ContainerSignup, Input } from './styled'
import axios from 'axios'
import { BASE_URL } from '../../constants/BASE_URL'
import { useNavigate } from 'react-router-dom'
import { irParaFeed } from '../../routes/coordinator'

export default function Signup() {
    const { form, onChange } = useForms({ email: "", senha: "", nomeUsuario: "", confirmaSenha: "" })

    const navigate = useNavigate()

    const enviarCadastro = (e) => {
        e.preventDefault()
        //* EXTRA: validando a senha - ter certeza que o usuário sabe qual senha cadastrou
        // não é necessário caso use o pattern para a mesma funcionalidade
        if (form.senha === form.confirmaSenha) {

            const dadosUsuario = {
                username: form.nomeUsuario,
                email: form.email,
                password: form.senha
            }

            console.log(dadosUsuario)

            axios.post(`${BASE_URL}/users/signup`, dadosUsuario)
            .then((resp)=>{
                console.log(resp.data.token);
                localStorage.setItem('token', resp.data.token)
                irParaFeed(navigate)
            })
            .catch((err)=>{
                console.log(err.response.data);
                alert(err.response.data)
            })

        } else {
            alert("Digite a mesma senha nos campos 'senha' e 'confirmação de senha'")
        }
    }

    return (
        <ContainerSignup>
            <ContainerForm onSubmit={enviarCadastro}>
                <label htmlFor='nome'>Nome de usuario:</label>
                <Input
                    id='nome'
                    name='nomeUsuario'

                    pattern='[a-zA-Z\u00C0-\u00FF ]{3,}'

                    title='Nome de usuário deve ter no mínimo 3 caracteres. Podendo conter letras, acentos e espaço'
                    value={form.nomeUsuario}
                    onChange={onChange}
                    placeholder="username"
                    required
                />
                <label htmlFor='email'>Email:</label>
                <Input
                    id='email'
                    name='email'
                    type={"email"}
                    value={form.email}
                    onChange={onChange}
                    placeholder="nome@email.com"
                    required
                />
                <label htmlFor='senha'>Senha:</label>
                <Input
                    id='senha'
                    name='senha'
                    type="password"
                    minLength={8}
                    value={form.senha}
                    onChange={onChange}
                    placeholder="Crie sua senha"
                    required
                />
                <label htmlFor='confirma-senha'>Confirmação de senha:</label>
                <Input
                    id='confirma-senha'
                    name='confirmaSenha'
                    type={"password"}
                    value={form.confirmaSenha}
                    onChange={onChange}
                    placeholder="Confirme a senha"
                    // verifica se a senha é a mesma nos dois campos
                    pattern={`${form.senha}`}
                    title="confirme a senha digitada"
                    required
                />
                <button>Cadastrar</button>
            </ContainerForm>
        </ContainerSignup>
    )
}
