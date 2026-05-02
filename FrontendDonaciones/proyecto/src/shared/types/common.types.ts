export type ApiError = {
  message: string;
  statusCode?: number;
};

export type RouteItem = {
  path: string;
  name: string;
};