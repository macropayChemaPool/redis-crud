namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    REDIS_HOST: string;
    REDIS_PORT: number;
    REDIS_PASS: string;
    SECRET_SIGNATURE?: string;
  }
}
