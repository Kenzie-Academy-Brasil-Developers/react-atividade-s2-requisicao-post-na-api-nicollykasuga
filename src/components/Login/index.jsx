import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axios from "axios";
import "./style.css";

function Login() {
  const [authentication, setAuthentication] = useState();

  const formSchema = yup.object().shape({
    username: yup.string().required("UserName obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  function onSubmitFunction(user) {
    console.log(user);
    axios
      .post("https://kenzieshop.herokuapp.com/sessions/", user)
      .then(response => {
        console.log(response);
        setAuthentication(true);
      })
      .catch(err => console.log("Deu não chará"));
  }

  return (
    <>
      <h3 className="title">Requisição POSt na API</h3>
      <div>
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <input
            className="input"
            placeholder="Username"
            type="text"
            {...register("username")}
          ></input>
          <p className="text">{errors.name?.message}</p>
          <input
            className="input"
            placeholder="Senha"
            type="password"
            {...register("password")}
          ></input>
          <p className="text">{errors.password?.message}</p>
          <button className="button-submit" type="submit">
            {" "}
            Entrar
          </button>
        </form>

        {authentication ? (
          <p className="text-request-complete">Requisição Completa!</p>
        ) : (
          <p className="text-request-failed">Requisição Falhou!</p>
        )}
      </div>
    </>
  );
}

export { Login };
