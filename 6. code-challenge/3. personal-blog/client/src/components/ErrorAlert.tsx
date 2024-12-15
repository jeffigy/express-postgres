import { AxiosApiResponse } from "@/types/ServerResponse";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

const ErrorAlert = ({ error }: { error: Error }) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {(error as AxiosApiResponse)?.response?.data.message}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
