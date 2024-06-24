import RegisterForm from "../RegisterForm/RegisterForm";

function Register() {
  const handleSubmit = (values) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit}></RegisterForm>
    </div>
  );
}

export default Register;
