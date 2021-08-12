import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Providers/Auth";

const Login = () => {

  const { logIn } = useAuth()

  const schema = yup.object().shape({
    username: yup.string().required("Nome de usuário obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitFunction = (data) => {
    console.log(data)
    logIn(data)
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <h1>Login</h1>
        <input
          {...register("username")}
          name="username"
          placeholder="Nome de usuário"
          error={errors.username?.message}
        ></input>
        <input
          {...register("password")}
          name="password"
          placeholder="Sua senha"
          type="password"
          error={errors.password?.message}
        ></input>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Login;
