import useProtectedRoute from '@/hooks/useProtectedRoute'

const Main = () => {
  useProtectedRoute()
  return <div>index</div>
}

export default Main
