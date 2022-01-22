import { Actions } from "./types";

const auth: Actions = {
  init: "noted/ log-in",
  fail: "noted/ log-in-fail",
  success: "noted/ log-in-success",
};

export const NotedAction = {
  auth,
};
