import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../State/Auth/Action";

const AdminLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    dispatch(login(userData));
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Admin Login</h2>
        <p className="text-sm text-gray-500">Only authorized admins can access the admin panel.</p>
      </div>

      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="flex flex-wrap gap-6">
          <div className="w-full">
            <TextField
              required
              id="email"
              name="email"
              label="Admin Email"
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
              type="password"
              fullWidth
              autoComplete="current-password"
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
              Login as Admin
            </Button>
          </div>
        </div>
      </form>

      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center">
          <p>Want normal login?</p>
          <Button onClick={() => navigate("/login")} className="ml-5" size="small">
            User Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginForm;

