import { CorsOptions } from "cors";
import { CORS_WHITELIST } from "./config";

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin && CORS_WHITELIST.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
