import { Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserRequest, register } from "../State/Auth/Action";

const RegisterForm = () => {

    const navigate= useNavigate ();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const auth = useSelector((state) => state.auth);

   useEffect(() => {
    if(jwt){
      dispatch(getUserRequest({jwt}))
    }
  },[jwt,auth?.jwt])

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const userData={
            firstName: data.get ("firstName"),
            lastName: data.get ("lastName"),
            email: data.get ("email"),
            password: data.get ("password"),
        }
        dispatch(register(userData))

        console.log({"userData":userData})
    }
  return (
   <div>
  <form onSubmit={handleSubmit}>
    <div className="flex flex-wrap gap-6">
      <div className="w-full sm:w-[calc(50%-12px)]">
        <TextField
          required
          id="firstName"
          name="firstName"
          label="First Name"
          fullWidth
          autoComplete="given-name"
        />
      </div>

      <div className="w-full sm:w-[calc(50%-12px)]">
        <TextField
          required
          id="lastName"
          name="lastName"
          label="Last Name"
          fullWidth
          autoComplete="given-name"
        />
      </div>

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
          Register
        </Button>
      </div>
    </div>
  </form>
  <div className="flex justify-center flex-col items-center">
    <div className="py-3 flex items-center">
        <p>Already have an account? </p>
        <Button onClick={()=>navigate("/login")} className="ml-5" size="small">Login</Button>
    </div>
  </div>
</div>
  )
}


export default RegisterForm
