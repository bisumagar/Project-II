import { Route, Routes, Navigate } from 'react-router-dom'
import Admin from '../Admin/components/Admin'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserRequest } from '../State/Auth/Action'

const AdminRouters = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const token = typeof window !== "undefined" ? localStorage.getItem("jwt") : null

  useEffect(() => {
    if (token && !auth.user && !auth.isLoading) {
      dispatch(getUserRequest())
    }
  }, [auth.isLoading, auth.user, dispatch, token])

  // not logged in
  if (!token) return <Navigate to="/login" replace />

  // wait for profile
  if (auth.isLoading && !auth.user) return null

  // logged in but not admin
  if (auth.user && auth.user.role !== "ADMIN") return <Navigate to="/login" replace />

  return (
    <div>
      <Routes>
        <Route path ='/*' element={<Admin/>}/>
      </Routes>
    </div>
  )
}

export default AdminRouters
