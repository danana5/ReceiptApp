import { getAnalytics } from "firebase/analytics";
import { app } from "./config";

export const analytics = getAnalytics(app);
