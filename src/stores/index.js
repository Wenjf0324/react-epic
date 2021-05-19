import React, { createContext, useContext } from "react";
import AuthStore from "./auth";
import UserStore from "./user";
import ImageStore from "./image";
import HistoryStore from "./history";

const context = createContext({
  AuthStore,
  UserStore,
  ImageStore,
  HistoryStore,
});

//本地测试
window.stores = {
  AuthStore,
  UserStore,
  ImageStore,
  HistoryStore,
};

export const useStores = () => useContext(context);
