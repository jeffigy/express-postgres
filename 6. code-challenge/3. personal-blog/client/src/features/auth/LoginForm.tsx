import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "./authMutation";
import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader } from "lucide-react";
import { AxiosApiResponse } from "@/types/ServerResponse";

const LoginForm = () => {
  const { mutate: login, isError, error, isPending } = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {isError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {(error as AxiosApiResponse)?.response?.data.message}
              </AlertDescription>
            </Alert>
          )}

          <Input
            placeholder="Email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={!email && !password}>
            {isPending ? (
              <>
                <Loader className="animate-spin" />
                Logging in
              </>
            ) : (
              "Login"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default LoginForm;
