import { useNavigate } from "react-router-dom";

function Navbar(){

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));


  function logout(){

    localStorage.removeItem("user");

    navigate("/login");

  }


  return (

    <nav>

      <h2>
        TaskFlow
      </h2>


      <div>

        <span>
          Welcome {user?.name}
        </span>


        <button onClick={logout}>
          Logout
        </button>

      </div>


    </nav>

  );

}


export default Navbar;