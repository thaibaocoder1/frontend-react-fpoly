import InputField from "@components/FormControls/InputField";
import PasswordField from "@components/FormControls/PasswordField";
import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Button, LinearProgress, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

const defaultTheme = createTheme();

function RegisterForm(props) {
  const schema = yup.object({
    fullname: yup
      .string()
      .required("Please enter fullname")
      .test(
        "should has at least two words",
        "Please enter at least two words",
        (value) => {
          return value.split(" ").length >= 2;
        }
      ),
    username: yup.string().required("Please enter username"),
    email: yup
      .string()
      .required("Please enter email")
      .email("Please enter a valid email"),
    phone: yup
      .string()
      .required("Please enter phone number")
      .test("should match with pattern", "Phone is invalid", (value) => {
        const pattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        return pattern.test(value);
      }),
    password: yup
      .string()
      .required("Please enter password")
      .min(6, "Please enter at least 6 characters"),
    retypePassword: yup
      .string()
      .required("Please enter retype password")
      .min(6, "Please enter at least 6 characters")
      .oneOf([yup.ref("password")], "Password does not match"),
  });
  const form = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      username: "",
      phone: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
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
        Please register your account
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullname" label="Fullname" form={form}></InputField>
        <InputField name="username" label="Username" form={form}></InputField>
        <InputField name="email" label="Email" form={form}></InputField>
        <InputField name="phone" label="Phone" form={form}></InputField>
        <PasswordField
          name="password"
          label="Password"
          form={form}
        ></PasswordField>
        <PasswordField
          name="retypePassword"
          label="Retype Password"
          form={form}
        ></PasswordField>
        <Button
          disabled={!isValid}
          sx={{ width: "100%" }}
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          Create an account
        </Button>
      </form>
    </ThemeProvider>
  );
}

export default RegisterForm;
