namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    REDIS_HOST: string;
    REDIS_PORT: number;
    SECRET_SIGNATURE?: string
  }
}
