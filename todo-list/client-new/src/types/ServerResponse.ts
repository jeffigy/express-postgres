import { AxiosError } from "axios";

export type AxiosApiResponse = AxiosError<{ message: string }>;
