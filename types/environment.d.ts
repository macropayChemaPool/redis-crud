namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    REDIS_HOST: string;
    REDIS_PORT: number;
  }
}
