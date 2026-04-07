import { Box, Modal } from '@mui/material';
import { useLocation } from 'react-router-dom';
import AdminLoginForm from './AdminLoginForm';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  outline: 'none',
  boxShadow: 24,
  p: 4,
};

const AuthModal = ({handleClose, open, onSignInSuccess}) => {

  const location = useLocation();
  const isAdminLogin = new URLSearchParams(location.search).get("admin") === "1";

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {location.pathname === "/login" ? (isAdminLogin ? <AdminLoginForm/> : <LoginForm/>) : <RegisterForm/>}
      </Box>
    </Modal>
  )
}

export default AuthModal
