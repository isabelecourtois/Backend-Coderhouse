// ----------- LOGIN
export function getLogin(req, res) {
    req.isAuthenticated()
      ? res.redirect('/index')
      : res.render('login');
  }
  
  export function postLogin(req, res) {
    res.redirect("index");
  }
  
  export function getLoginError(req, res) {
    res.render('login-error');
  }
  
  // ------------ REGISTER
  
  export function getRegister(req, res) {
    res.render("register");
  }
  
  export function getRegisterError (req, res) {
    res.render('register-error');
  };
  
  // ------------- LOGOUT
  
  export function getLogout (req, res) {
    req.logout((err) => {req.logError(err);});
    res.redirect("/login");
  };
  