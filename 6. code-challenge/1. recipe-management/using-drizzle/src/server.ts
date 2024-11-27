import app from "./app";
import { PORT } from "./utils/config";

app.listen(PORT, () => {
  console.log(`app is running @ port ${PORT}`);
});
