import { RequestInit, RequestCredentials } from 'node-fetch';

interface RequestMeta {
  ok: boolean;
  status: number;
}

interface JsonResponse extends RequestMeta {
  json: any;
}

interface TextResponse extends RequestMeta {
  text: string;
}

export default async function jsonFetch(
  url: string,
  params: any = {}
): Promise<JsonResponse | TextResponse | null> {
  let requestParams: RequestInit = {
    ...params,
    headers: {
      ...(params.headers || {}),
      'Content-Type': 'application/json',
    },
  };

  if (requestParams.body) {
    requestParams.body = JSON.stringify(requestParams.body);
  }

  //fetch api cache burst
  const request = await fetch(
    url.includes('?') ? `${url}&${Date.now()}` : `${url}?${Date.now()}`,
    // @todo: add type for requestParams
    requestParams as any
  );

  if (!request.text)
    throw new Error("Request error")

  const text = await request.text();
  const requestMeta = {
    ok: request.ok,
    status: request.status,
  };
  try {
    return request.headers.get('content-type')?.includes('application/json')
      ? {
        json: JSON.parse(text),
        ...requestMeta,
      }
      : {
        text,
        ...requestMeta,
      };
  } catch (err) {
    console.error('Cannot transform text into JSON:', err);
    return {
      text,
      ...requestMeta,
    };
  }
}
