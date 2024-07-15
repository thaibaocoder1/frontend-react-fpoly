import PasswordField from "@components/FormControls/PasswordField";
import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, LinearProgress, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
};
const defaultTheme = createTheme();
const schema = yup.object({
  password: yup
    .string()
    .required("Please enter this field")
    .min(6, "Please enter at least 6 characters"),
  retypePassword: yup
    .string()
    .required("Please enter this field")
    .min(6, "Please enter at least 6 characters")
    .oneOf([yup.ref("password")], "Password not match"),
});
function ResetPasswordForm(props) {
  const form = useForm({
    defaultValues: {
      password: "",
      retypePassword: "",
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
        Reset password
      </Typography>
      <form
        style={{ maxWidth: "600px", margin: "0 auto" }}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField
          name="retypePassword"
          label="Retype Password"
          form={form}
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
        <Divider sx={{ width: "100%" }}>OR</Divider>
      </form>
      <Box pb={1} textAlign={"center"}>
        <Button color="primary">
          <Link to={"/register"}>Dont have an account. Register here</Link>
        </Button>
      </Box>
    </ThemeProvider>
  );
}

export default ResetPasswordForm;
