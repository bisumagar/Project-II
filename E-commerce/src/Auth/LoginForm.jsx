import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../State/Auth/Action";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const userData={
           
            email: data.get ("email"),
            password: data.get ("password"),
        }
        dispatch(login(userData))

        console.log({"userData":userData})
    }
  return (
   <div>
  <form onSubmit={handleSubmit}>
    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
    <div className="flex flex-wrap gap-6">
      <div className="w-full">
        <TextField
          required
          id="email"
          name="email"
          label="Email Address"
          fullWidth
          autoComplete="email"
        />
      </div>

      <div className="w-full">
        <TextField
          required
          id="password"
          name="password"
          label="Password"
          fullWidth
          autoComplete="password"
        />
      </div>

      <div className="w-full">
        <Button
          className="bg-[#9155FD]"
          type="submit"
          variant="contained"
          size="large"
          fullWidth
        >
          Login
        </Button>
      </div>
    </div>
  </form>
  <div className="flex justify-center flex-col items-center">
      <div className="py-3 flex items-center">
          <p> Do not have an account? </p>
          <Button onClick={()=>navigate("/register")} className="ml-5" size="small">Register</Button>
      </div>
    </div>
</div>
  )
}


export default LoginForm
