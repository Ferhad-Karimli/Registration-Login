import React from "react";
import styles from "../../styles/global.module.css";
import {
  TextField,
  Typography,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  Button,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { authRequestHandler } from "../../helpers/index";
export default function Login() {
  const redirect = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: handleLogin } = useMutation({
    mutationFn: (values) => authRequestHandler("/login", values),
    onSuccess: (res) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: res.data,
        })
      );
      redirect("/charts");
    },
    onError: (err) => {
      toast.error(err.response.data);
    },
  });

  const onSubmit = async (values) => {
    await handleLogin(values);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Log in
      </Typography>

      <Controller
        name="email"
        control={control}
        rules={{
          required: "This field is required!",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Enter a valid email address!",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            className={styles.input}
            error={!!errors.email}
            helperText={errors?.email?.message}
            label="Email"
            placeholder="Email"
          />
        )}
      />

      <br />

      <Controller
        name="password"
        control={control}
        rules={{
          required: "This field is required!",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters !",
          },
        }}
        render={({ field }) => (
          <>
            <FormControl variant="outlined" fullWidth error={!!errors.password}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                {...field}
                type={showPassword ? "text" : "password"}
                className={styles.input}
                error={!!errors.password}
                helperText={errors?.password?.message}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                placeholder="Password"
              />

              {errors.password && (
                <FormHelperText>{errors.password.message}</FormHelperText>
              )}
            </FormControl>
          </>
        )}
      />
      <br />

      <Button variant="contained" type="submit" className={styles.btn}>
        Log in
      </Button>
    </form>
  );
}
