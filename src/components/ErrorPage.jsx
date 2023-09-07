import { Link } from "react-router-dom";

export default function ErrorPage({ error }) {
  const code = error?.response?.status || error.code;

  let msg;
  switch (code) {
    case 404:
      msg = "Not Found";
      break;
    case 500:
      msg = "Internal Server Error";
      break;
    default:
      msg = "Something Went Wrong";
  }
  return (
    <main>
      <h2>Error {code}</h2>
      <p>{msg}</p>
      <Link className="return-link" to={"/"}>
        Return Home
      </Link>
    </main>
  );
}
