import app from "./src/app";
import { PORT } from "./src/utils/config";

app.listen(PORT, () => {
  console.log(`app is running @ port ${PORT}`);
});
