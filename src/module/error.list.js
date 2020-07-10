module.exports = {
  badLogin: process.env.NODE_ENV == 'production' ? 'Le login et/ou le mot de passe incorrect' : 'Le login incorrect',
  badPW: process.env.NODE_ENV == 'production' ? 'Le login et/ou le mot de passe incorrect' : 'Le mot de passe incorrect',
  badRight: 'Vous n\'avez pas les droits',
  badData: 'données invalide',
  noAuth: 'Not auth',
  badToken: 'Token is not valid',
}
