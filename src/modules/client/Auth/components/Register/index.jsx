import toastObj from "@utils/Toast";
import RegisterForm from "../RegisterForm/RegisterForm";

function Register() {
  const handleSubmit = (values) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
    toastObj.success();
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit}></RegisterForm>
    </div>
  );
}

export default Register;
