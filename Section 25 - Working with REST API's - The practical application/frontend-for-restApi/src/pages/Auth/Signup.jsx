// /* eslint-disable react/prop-types */
// import React, { useState, useCallback } from "react";

// import Input from "../../components/Input";
// import Button from "../../components/Button";
// import { required, length, email } from "../../util/validators";
// import Auth from "./Auth";

// const Signup = (props) => {
//   const [signupForm, setSignupForm] = useState({
//     email: {
//       value: "",
//       valid: false,
//       touched: false,
//       validators: [required, email],
//     },
//     password: {
//       value: "",
//       valid: false,
//       touched: false,
//       validators: [required, length({ min: 5 })],
//     },
//     name: {
//       value: "",
//       valid: false,
//       touched: false,
//       validators: [required],
//     },
//   });

//   const [formIsValid, setFormIsValid] = useState(false);

//   const inputChangeHandler = useCallback((input, value) => {
//     setSignupForm((prevSignupForm) => {
//       let isValid = true;
//       for (const validator of prevSignupForm[input].validators) {
//         isValid = isValid && validator(value);
//       }

//       const updatedForm = {
//         ...prevSignupForm,
//         [input]: {
//           ...prevSignupForm[input],
//           valid: isValid,
//           value: value,
//         },
//       };

//       // Calculate form validity
//       const isFormValid = Object.keys(updatedForm).every(
//         (key) => key === "formIsValid" || updatedForm[key].valid
//       );

//       setFormIsValid(isFormValid);

//       return updatedForm;
//     });
//   }, []);

//   const inputBlurHandler = useCallback((input) => {
//     setSignupForm((prevSignupForm) => ({
//       ...prevSignupForm,
//       [input]: {
//         ...prevSignupForm[input],
//         touched: true,
//       },
//     }));
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formIsValid) {
//       props.onSignup(e, {
//         email: signupForm.email.value,
//         password: signupForm.password.value,
//         name: signupForm.name.value,
//       });
//     }
//   };

//   return (
//     <Auth>
//       <form onSubmit={handleSubmit}>
//         <Input
//           id="email"
//           label="Your E-Mail"
//           type="email"
//           control="input"
//           onChange={(value) => inputChangeHandler("email", value)}
//           onBlur={() => inputBlurHandler("email")}
//           value={signupForm.email.value}
//           valid={signupForm.email.valid}
//           touched={signupForm.email.touched}
//           required
//           autoComplete="username"
//         />
//         <Input
//           id="name"
//           label="Your Name"
//           type="text"
//           control="input"
//           onChange={(value) => inputChangeHandler("name", value)}
//           onBlur={() => inputBlurHandler("name")}
//           value={signupForm.name.value}
//           valid={signupForm.name.valid}
//           touched={signupForm.name.touched}
//           required
//           autoComplete="name"
//         />
//         <Input
//           id="password"
//           label="Password"
//           type="password"
//           control="input"
//           onChange={(value) => inputChangeHandler("password", value)}
//           onBlur={() => inputBlurHandler("password")}
//           value={signupForm.password.value}
//           valid={signupForm.password.valid}
//           touched={signupForm.password.touched}
//           required
//           autoComplete="new-password"
//         />
//         <Button
//           design="raised"
//           type="submit"
//           loading={props.loading}
//           disabled={!formIsValid}>
//           Signup
//         </Button>
//       </form>
//     </Auth>
//   );
// };

// export default Signup;
import React, { useState, useCallback } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { required, length, email } from "../../util/validators";
import Auth from "./Auth";

const Signup = ({ onSignup, loading }) => {
  const [signupForm, setSignupForm] = useState({
    email: {
      value: "",
      valid: false,
      touched: false,
      validators: [required, email],
    },
    password: {
      value: "",
      valid: false,
      touched: false,
      validators: [required, length({ min: 5 })],
    },
    name: { value: "", valid: false, touched: false, validators: [required] },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangeHandler = useCallback((input, value) => {
    setSignupForm((prevSignupForm) => {
      const updatedField = {
        ...prevSignupForm[input],
        value,
        valid: prevSignupForm[input].validators.every((validator) =>
          validator(value)
        ),
      };

      const updatedForm = { ...prevSignupForm, [input]: updatedField };
      setFormIsValid(Object.values(updatedForm).every((field) => field.valid));

      return updatedForm;
    });
  }, []);

  const inputBlurHandler = useCallback((input) => {
    setSignupForm((prevSignupForm) => ({
      ...prevSignupForm,
      [input]: { ...prevSignupForm[input], touched: true },
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formIsValid) {
      onSignup(e, {
        email: signupForm.email.value,
        password: signupForm.password.value,
        name: signupForm.name.value,
      });
    }
  };

  return (
    <Auth>
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          label="Your E-Mail"
          type="email"
          control="input"
          onChange={(value) => inputChangeHandler("email", value)}
          onBlur={() => inputBlurHandler("email")}
          value={signupForm.email.value}
          valid={signupForm.email.valid}
          touched={signupForm.email.touched}
          required
          autoComplete="username"
        />
        <Input
          id="name"
          label="Your Name"
          type="text"
          control="input"
          onChange={(value) => inputChangeHandler("name", value)}
          onBlur={() => inputBlurHandler("name")}
          value={signupForm.name.value}
          valid={signupForm.name.valid}
          touched={signupForm.name.touched}
          required
          autoComplete="name"
        />
        <Input
          id="password"
          label="Password"
          type="password"
          control="input"
          onChange={(value) => inputChangeHandler("password", value)}
          onBlur={() => inputBlurHandler("password")}
          value={signupForm.password.value}
          valid={signupForm.password.valid}
          touched={signupForm.password.touched}
          required
          autoComplete="new-password"
        />
        <Button
          design="raised"
          type="submit"
          loading={loading}
          disabled={!formIsValid}>
          Signup
        </Button>
      </form>
    </Auth>
  );
};

export default Signup;
