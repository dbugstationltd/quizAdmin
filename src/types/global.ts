import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data: T;
  error?: any;
  meta?: TMeta;
  status: "success" | "error";
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
