//引用SDK
import AV, { Query, User } from "leancloud-storage";

//初始化
AV.init({
  appId: "nluzu3wJlk0JtpY7MO3CPWX0-gzGzoHsz",
  appKey: "NPJsJeTuREDxsJKmxVliQgBp",
  serverURL: "https://nluzu3wj.lc-cn-n1-shared.com",
});

const Auth = {
  //注册接口
  register(username, password) {
    let user = new User();
    user.setUsername(username);
    user.setPassword(password);
    return new Promise((resolve, reject) => {
      user.signUp().then(
        (loginedUser) => resolve(loginedUser),
        (error) => reject(error)
      );
    });
  },

  //登录接口
  login(username, password) {
    return new Promise((resolve, reject) => {
      User.logIn(username, password).then(
        (loginedUser) => resolve(loginedUser),
        (error) => reject(error)
      );
    });
  },

  //注销
  logout() {
    User.logOut();
  },

  //获取当前用户
  getCurrentUser() {
    return User.current();
  },
};

export { Auth };
