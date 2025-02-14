import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSignUpMutation } from "./authMutation";
import { useEffect, useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader } from "lucide-react";
import { AxiosApiResponse } from "@/types/ServerResponse";
import usePersist from "@/hooks/usePersist";

const SignUpForm = () => {
  const {
    mutate: signUp,
    isSuccess,
    isError,
    error,
    isPending,
  } = useSignUpMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_persist, setPersist] = usePersist();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signUp({ email, password, name });
  };
  useEffect(() => {
    if (isSuccess) {
      setPersist(true);
    }
  }, [isSuccess]);
  return (
    <form onSubmit={handleSubmit}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle>SignUp</CardTitle>
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
            placeholder="Name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />

          <Input
            placeholder="Email"
            value={email}
            type="email"
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
          <Button className="w-full" disabled={!email || !password || !name}>
            {isPending ? (
              <>
                <Loader className="animate-spin" />
                Signing Up
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default SignUpForm;
