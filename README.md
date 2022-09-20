This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This repo is a minimum reproduction of an issue noticed when using the reverse proxy in CF. 

The issue noted was only reproducible in local development due to the pass through API used to change the `Domain` part of the cookies created on gateway from "gateway.tillpayments.dev" to "localhost" for example. This is due to the necessity for the cookie to be used on the nextjs backend, as well as the gateway.

```
event - compiled client and server successfully in 341 ms (2580 modules)
FetchError: Invalid response body while trying to fetch http://localhost:3000/api/globalization/locales/en-au: incorrect header check    at Gunzip.<anonymous> (/Users/judrc/projects/till-nextgen/node_modules/next/dist/compiled/node-fetch/index.js:1:51064)    at Gunzip.emit (node:events:402:35)    at Gunzip.emit (node:domain:475:12)    at emitErrorNT (node:internal/streams/destroy:157:8)    at emitErrorCloseNT (node:internal/streams/destroy:122:3)    at processTicksAndRejections (node:internal/process/task_queues:83:21) {  type: 'system',  errno: 'Z_DATA_ERROR',  code: 'Z_DATA_ERROR'
}wait  - compiling /_error (client and server)...
event - compiled client and server successfully in 353 ms (2581 modules)
```

The error above is thrown in `/pages/api/[...path]`

Documentation on [catch all api routes](https://nextjs.org/docs/api-routes/dynamic-api-routes#catch-all-api-routes)



## Getting Started

Install packages

```bash
yarn install
```

***Update .env with correct gateway URL***

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

A form has been added to help with changing routes, however, the default value (`"/globalization/locales/en-au"`) is a known endpoint that causes the error.

## Debugging

The error can be seen in the node logs where you started the service.
To view the server side logs in the chrome console (which can be easier to use),
once the server starts, open a new tab in Chrome and visit chrome://inspect, where you should see your Next.js application inside the Remote Target section. Click inspect under your application to open a separate DevTools window, then go to the Sources tab.
[https://nextjs.org/docs/advanced-features/debugging#server-side-code](https://nextjs.org/docs/advanced-features/debugging#server-side-code)
