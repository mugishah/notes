import { cleanEnv, port, str } from 'envalid';

// Validate environment variables and throw an error if they are not present during runtime
export default cleanEnv(process.env, {
  MONGODB_CONNECTION_STRING: str(),
  PORT: port(),
  SESSION_SECRET: str()
})