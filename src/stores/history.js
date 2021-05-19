import { observable, action, makeObservable } from "mobx";
import { Uploader } from "../models";
import { message } from "antd";

class HistoryStore {
  //解决版本问题带来的用户名不同步
  constructor() {
    makeObservable(this);
  }

  @observable list = []; //要展示的数据
  @observable isLoading = false; //是否在加载中
  @observable hasMore = true; //当前数据是否加载完，是否有更多的数据
  @observable page = 0; //当前页
  limit = 10;

  @action append(newList) {
    this.list = this.list.concat(newList); //将新数据插入到原来的list中
  }

  @action find() {
    this.isLoading = true;
    //调用find()接口
    Uploader.find({ page: this.page, limit: this.limit })
      .then((newList) => {
        this.append(newList);
        this.page++;
        //判断数据是否加载完
        if (newList.length < this.limit) {
          this.hasMore = false;
        }
      })
      .catch((error) => {
        message.error("加载数据失败");
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  @action reset() {
    this.list = []; //要展示的数据
    this.isLoading = false; //是否在加载中
    this.hasMore = true; //当前数据是否加载完，是否有更多的数据
    this.page = 0; //当前页
  }
}

export default new HistoryStore();
