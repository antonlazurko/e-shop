import { useMemo } from 'react'
import {  useLocation } from 'react-router-dom'

export const useQuery = () => {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}
export const allowOnlyNumbers = (event) => {
  // not allow to enter '-', '+' and 'e'
  return (
    event.charCode === 45 ||
    event.charCode === 43 ||
    event.charCode === 101||
    event.charCode === 44 ||
    event.charCode === 46 ||
    event.charCode === 69
  ) && event.preventDefault()
}