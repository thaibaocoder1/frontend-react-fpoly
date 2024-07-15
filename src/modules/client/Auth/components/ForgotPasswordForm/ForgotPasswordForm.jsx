import InputField from "@components/FormControls/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, LinearProgress, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";

ForgotPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
};
const defaultTheme = createTheme();
const schema = yup.object({
  email: yup
    .string()
    .required("Please enter email")
    .email("Please enter a valid email"),
});
function ForgotPasswordForm(props) {
  const form = useForm({
    defaultValues: {
      email: "",
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
        Forgot Password
      </Typography>

      <form
        style={{ maxWidth: "600px", marginInline: "auto" }}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <InputField
          name="email"
          label="Email"
          form={form}
          autoComplete="email"
        />
        <Button
          disabled={!isValid}
          sx={{ width: "100%" }}
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          Submit
        </Button>
        <Divider>OR</Divider>
      </form>
      <Box pb={1} textAlign={"center"}>
        <Button color="primary">
          <Link to={"/register"}>Dont have an account. Register here</Link>
        </Button>
      </Box>
    </ThemeProvider>
  );
}

export default ForgotPasswordForm;
