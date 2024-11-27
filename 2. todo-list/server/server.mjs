import app from "./src/app.mjs";
import { PORT } from "./src/utils/config.mjs";

app.listen(PORT, () => {
  console.log(`app is running @ port ${PORT}`);
});
