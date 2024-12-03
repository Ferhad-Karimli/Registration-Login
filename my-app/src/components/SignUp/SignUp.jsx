import React from "react";
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
  Select,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "../../styles/global.module.css";
import { useMutation } from "@tanstack/react-query";
import { authRequestHandler } from "../../helpers";

export default function SignUp({ setActiveTab }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      password: "",
      role: "",
    },
  });

  const { mutate: handleSignup } = useMutation({
    mutationFn: (values) => authRequestHandler("/register", values),
    onSuccess: () => {
      toast.success("User created succesfully");
      setActiveTab(0);
    },
    onError: (err) => {
      toast.error(err.response.data);
    },
  });
  const onSubmit = async (values) => {
    await handleSignup(values);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Sign Up
      </Typography>
      <Controller
        name="name"
        control={control}
        rules={{
          required: "This field is required!",
          minLength: {
            value: 3,
            message: "Name must have at least 3 characters !",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            className={styles.input}
            variant="outlined"
            placeholder="Name"
            error={!!errors.name}
            helperText={errors?.name?.message}
            label="Name"
          />
        )}
      />
      <br />

      <Controller
        name="surname"
        control={control}
        rules={{
          required: "This field is required!",
          minLength: {
            value: 3,
            message: "Sername must have at least 3 characters!",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            className={styles.input}
            variant="outlined"
            placeholder="Sername"
            error={!!errors.surname}
            helperText={errors?.surname?.message}
            label="Sername"
          />
        )}
      />
      <br />

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
        name="phone"
        control={control}
        rules={{
          required: "This field is required!",
          pattern: {
            value: /^\+?[0-9]*$/,
            message: "Only numbers are allowed ! ",
          },
          minLength: {
            value: 7,
            message: "Phone number must be at least 7 characters !",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            className={styles.input}
            variant="outlined"
            placeholder="Phone"
            error={!!errors.phone}
            helperText={errors?.phone?.message}
            label="Phone"
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

      <Controller
        name="role"
        rules={{
          required: "This field is required!",
        }}
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.role}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              {...field}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Role"
            >
              <MenuItem value={"user"}>User</MenuItem>
              <MenuItem value={"admin"}>Admin</MenuItem>
            </Select>
            {errors.password && (
              <FormHelperText>{errors.role.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
      <br />

      <Button variant="contained" type="submit" className={styles.btn}>
        Sign up
      </Button>
    </form>
  );
}
