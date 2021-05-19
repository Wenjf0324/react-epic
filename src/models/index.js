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

const Uploader = {
  //上传图片接口
  add(file, filename) {
    const item = new AV.Object("Image");
    const avFile = new AV.File(filename, file);
    item.set("filename", filename); //文件名
    item.set("owner", AV.User.current()); //作者
    item.set("url", avFile); //文件url
    return new Promise((resolve, reject) => {
      item.save().then(
        (serverFile) => {
          resolve(serverFile);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  //查询数据
  find({ page = 0, limit = 10 }) {
    const query = new AV.Query("Image");
    query.include("owner"); //查询包含owner字段的所有信息
    query.limit(limit); //只获取limit条
    query.skip(page * limit); //跳过的信息
    query.descending("createdAt"); //降序排列
    query.equalTo("owner", AV.User.current()); //只限制当前用户
    return new Promise((resolve, reject) => {
      query
        .find()
        .then((results) => resolve(results))
        .catch((error) => reject(error));
    });
  },
};

window.Uploader = Uploader;

export { Auth, Uploader };
