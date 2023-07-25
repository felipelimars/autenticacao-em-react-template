import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { irParaHome } from '../routes/coordinator'

const useProtectedPage = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      irParaHome(navigate)
    }
  }, [])

}

export default useProtectedPage
