


export type OpenColorsT =
  | "gray"
  | "red"
  | "pink"
  | "grape"
  | "violet"
  | "indigo"
  | "blue"
  | "cyan"
  | "teal"
  | "green"
  | "lime"
  | "yellow"
  | "orange";





export type RequestRespT<T> = {
  data?: T;
  success?: boolean;
  message?: string;
};


