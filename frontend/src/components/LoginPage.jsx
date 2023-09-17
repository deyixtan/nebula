import LoginForm from "./LoginForm.jsx";
import "./LoginPage.css";

function App() {
  return (
    <>
      {/* <div>
        <p>
          <a
            className="btn btn-primary"
            href="http://localhost:5000/authorize/google"
          >
            Login with Google
          </a>
          <a
            className="btn btn-primary"
            href="http://localhost:5000/authorize/github"
          >
            Login with GitHub
          </a>
        </p>
      </div> */}
      <LoginForm />
    </>
  );
}

export default App;
