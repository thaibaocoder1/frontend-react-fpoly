import InputField from "@components/FormControls/InputField";
import PasswordField from "@components/FormControls/PasswordField";
import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, LinearProgress, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};
const defaultTheme = createTheme();
const schema = yup.object({
  email: yup
    .string()
    .required("Please enter email")
    .email("Please enter a valid email"),
  password: yup
    .string()
    .required("Please enter password")
    .min(6, "Please enter at least 6 characters"),
});
function LoginForm(props) {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema, { abortEarly: false }),
  });
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  const { isSubmitting, isValid } = form.formState;
  return (
    <ThemeProvider theme={defaultTheme}>
      {isSubmitting && <LinearProgress></LinearProgress>}
      <Avatar sx={{ margin: "0 auto", bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography sx={{ textAlign: "center" }} component="h3" variant="h5">
        Welcome to Ecommerce
      </Typography>
      <Typography sx={{ textAlign: "center" }} variant="p" component={"h3"}>
        Please login here
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField
          name="email"
          label="Email"
          form={form}
          autoComplete="email"
        />
        <PasswordField name="password" label="Password" form={form} />
        <Button
          disabled={!isValid}
          sx={{ width: "100%" }}
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          Login
        </Button>
      </form>
      <Box textAlign="center" pt={1}>
        <Button color="primary">
          <Link to={"/register"}>Dont have an account. Register here</Link>
        </Button>
      </Box>
    </ThemeProvider>
  );
}

export default LoginForm;
