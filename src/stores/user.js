import { observable, action, makeObservable } from "mobx";
import { Auth } from "../models";

class UserStore {
  //解决版本问题带来的用户名不同步
  constructor() {
    makeObservable(this);
  }

  @observable currentUser = null;

  @action pullUser() {
    this.currentUser = Auth.getCurrentUser();
  }

  @action resetUser() {
    this.currentUser = null;
  }
}

//导出对象
export default new UserStore();
