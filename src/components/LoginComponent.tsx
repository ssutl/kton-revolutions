import { useState, useEffect } from "react";
import styles from "../styles/LoginComponent.module.scss";
import LoginApi, { LoginApiReturnType } from "@/api/Users/Login";
import { useRouter } from "next/router";

const LoginComponent = () => {
  const [loginType, setLoginType] = useState<"Login" | "SignUp">("Login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginStatus, setLoginStatus] = useState<LoginApiReturnType>(undefined);
  const router = useRouter();
  const isIndexRoute = router.pathname === "/";

  const switchLoginState = () => {
    setLoginType((prevLoginType) =>
      prevLoginType === "Login" ? "SignUp" : "Login"
    );
  };

  const handleForm = () => {
    if (password.length < 8) {
      setLoginStatus("Password must be at least 8 characters long");
    } else {
      LoginApi({
        type: loginType,
        email: email.toLowerCase(),
        password: password,
      })
        .then((status) => {
          //This means that the user has not verified their email yet
          if (status === "pending verification") {
            //Display a message to the user that they need to verify their email
            alert("Please verify your email");
          }
        })
        .catch((error) => {
          setLoginStatus(error);
        });
    }
  };

  return (
    <form
      className={styles.loginSect}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onSubmit={(e) => {
        e.preventDefault();
        handleForm();
      }}
    >
      <div className={styles.loginInfoSect}>
        <p>{loginType === "Login" ? `Welcome Back` : `Start for free`}</p>
        <h1>
          {loginType === "Login" ? `Log In` : `Create account`}
          <span>.</span>
        </h1>
        <p onClick={() => switchLoginState()}>
          {loginType === "Login"
            ? `Haven't signed up yet?`
            : `Already a member?`}{" "}
          {loginType === "Login" ? (
            <span>Create an account</span>
          ) : (
            <span>Log In</span>
          )}
        </p>
      </div>
      <div className={styles.loginFormSect}>
        <input
          type="text"
          placeholder="Email"
          required
          value={email}
          autoComplete="off"
          onChange={(e) => {
            setEmail(e.target.value.replace(/\s/g, ""));
            setLoginStatus(undefined);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="off"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value.replace(/\s/g, ""));
            setLoginStatus(undefined);
          }}
        />
      </div>
      {loginStatus !== "pending verification" && loginStatus ? (
        <div className={styles.loginStatusSect}>{loginStatus}</div>
      ) : null}
      <div className={styles.loginButtonSect}>
        <input type="submit" value="Submit" id="loginSubmitInput"></input>
        <label htmlFor="loginSubmitInput" className={styles.submitBtn}>
          Submit
        </label>
      </div>
    </form>
  );
};

export default LoginComponent;
