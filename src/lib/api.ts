import { LAMBDA_URL } from "./constants";

interface LambdaParams {
  apiName: string;
  apiParam: string;
  tagName?: string;
}

export async function lambdaFetch<T>(params: LambdaParams): Promise<T> {
  const url = new URL(LAMBDA_URL);
  url.searchParams.set("apiName", params.apiName);
  url.searchParams.set("apiParam", params.apiParam);
  if (params.tagName) {
    url.searchParams.set("tagName", params.tagName);
  }

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.message as T;
}
