module.exports = {
  registerErrors(err) {
    let errors = { nickname: '', email: '', password: '' };

    switch(Object.keys(err.keyValue)[0]) {
        case 'nickname':
          errors.nickname = 'Pseudo incorrect ou déjà pris';
          break;
        case 'email':
          errors.email = 'Email incorrect';
          break;
        case 'password':
          errors.password = 'Mot de passe incorrect';
          break;
        default:
    };
    return errors;
  },
  loginErrors(err) {
    let errors = { email: '', password: '' };

    if(err.includes('email')) {
        errors.email = 'Email incorrect ou inconnu';
    };

    if(err.includes('password')) {
      errors.password = 'Mot de passe incorrect';
    };
    return errors;
  }
}
