export const formValidators = {
  username: usernameValid,
  firstname: firstnameValid,
  lastname: lastnameValid,
  email: emailValid,
  password: passwordValid,
};

const usernameValid = (user) => {
  return user.name && user.name.length > 0;
};

const firstnameValid = (user) => {
  return user.firstname && user.firstname > 0;
};

const lastnameValid = (user) => {
  return user.lastname && user.lastname > 0;
};

const emailValid = (user) => {
  return user.email && user.email > 0 && user.email.includes('@');
};
