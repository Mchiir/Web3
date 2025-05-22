import { useState } from 'react'

function useStorage() {
  const [address, setAddressState] = useState(() => {
    return localStorage.getItem('address') || ''
  })

  const setAddress = (newAddress: string) => {
    setAddressState(newAddress)
    localStorage.setItem('address', newAddress)
  }

  return { address, setAddress }
}

export default useStorage