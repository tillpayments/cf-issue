import { splitCookiesString } from "set-cookie-parser";

export default async function handler(
  req,
  res
) {
  const { host, ...passHeaders } = req.headers;
  const { path, ...params } = req.query;

  const pathArray = Array.isArray(path) ? path : [path];
  const url = new URL(process.env.REACT_APP_GATEWAY_URL);
  url.pathname = `${pathArray.join("/")}`;
  if (Object.keys(params).length) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value)
    );
  }

  const passReq = new Request(url.toString(), {
    method: req.method,
    credentials: "include",
    headers: passHeaders ,
    body: (() => {
      if (req.method === "GET") {
        return undefined;
      }
      if (passHeaders["content-type"] === "application/json") {
        return JSON.stringify(req.body);
      }
      return req.body;
    })(),
  });

  const response = await fetch(passReq);
  console.log(response)

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of response.headers.entries()) {
    if (key.toLowerCase() === "set-cookie") {
      const cookies = splitCookiesString(value);
      const newCookies = cookies.map((cookie) => {
        return cookie
          .split("; ")
          .map((part) => {
            if (part.includes("Domain")) {
              // allow cookies from gateway to work on the local api
              return `Domain=${
                new URL(process.env.REACT_APP_URL).hostname
              }`;
            }
            if (part.includes("Secure")) {
              // allow cookies to work in local dev for safari
              return "";
            }
            return part;
          })
          .join("; ");
      });
      res.setHeader(key, newCookies);
    } else {
      res.setHeader(key, value);
    }
  }

  res.status(response.status);
  res.write(await response.text());
  res.end();
}
