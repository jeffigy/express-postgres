import { CORS_WHITELIST } from "./config.mjs";

const corsOptions = {
  origin: (origin, callback) => {
    if (CORS_WHITELIST.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
export default corsOptions;
