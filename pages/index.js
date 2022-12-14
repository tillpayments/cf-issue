import Head from "next/head";
import { useState } from "react";
export default function Home() {
  const [endpoint, setEndpoint] = useState("/globalization/locales/en-au");
  function handleChange(event) {
    event.preventDefault();
    setEndpoint(event.target.value);
  }
  function handleSubmit(event) {
    console.log(window.location.origin)
    event.preventDefault();

    const url = new URL("/api"+endpoint, window.location.origin);

    const req = new Request(url.toString(), {
      method: "GET",
    });
    fetch(req);
  }
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form onSubmit={handleSubmit}>
          <label>
            Endpoint <br />
            <input value={endpoint} onChange={handleChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}
