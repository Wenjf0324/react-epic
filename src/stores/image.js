import { observable, action, makeObservable } from "mobx";
import { Uploader } from "../models";
import { message } from "antd";

class ImageStore {
  //解决版本问题带来的用户名不同步
  constructor() {
    makeObservable(this);
  }

  @observable filename = "";
  @observable file = null; //本地文件
  @observable isUploading = false;
  @observable serverFile = null; //服务器传回来的文件

  @action setFilename(newFilename) {
    this.filename = newFilename;
  }

  @action setFile(newFile) {
    this.file = newFile;
  }

  @action upload() {
    this.isUploading = true;
    this.serverFile = null;
    //创建Promise 便于获取错误
    return new Promise((resolve, reject) => {
      //调用上传图片接口
      Uploader.add(this.file, this.filename)
        .then((serverFile) => {
          this.serverFile = serverFile;
          resolve(serverFile);
        })
        .catch((err) => {
          message.error("上传失败");
          reject(err);
        })
        .finally(() => {
          this.isUploading = false;
        });
    });
  }

  @action reset() {
    this.isUploading = false;
    this.serverFile = null; //服务器传回来的文件
  }
}

//导出对象
export default new ImageStore();
