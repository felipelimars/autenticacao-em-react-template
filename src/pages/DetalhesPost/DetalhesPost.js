import React from 'react'
import useProtectedPage from '../../hooks/useProtectedPage'

export default function DetalhesPost() {

  useProtectedPage()

  return (
    <div>DetalhesPost</div>
  )
}
