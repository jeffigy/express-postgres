import app from "./app";
import { PORT } from "./utils/config";

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
