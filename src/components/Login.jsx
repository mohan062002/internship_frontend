import React, { useContext } from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";



export default function Login() {
  const [lname, setLname] = useState("");
  const [lpass, setLpass] = useState("");
  const [position, setPosition] = useState("");
  const [redirect, setRedirect] = useState(false);

  const{setUser,setIsLogin}=useContext(UserContext)

  async function registerSubmit(ev) {
    ev.preventDefault();
    try {
      //storing data obtained  from the response at endpoint /login into data variable
      const { data } = await axios.post("/login", {
        //sending lname and lpass to endpoint using axios
        position,
        lname,
        lpass,
      });
      console.log(data);  //printing data in console
      if (data==="not found")
       {
        alert("User doesnt exist");
       }
      else if(data==="unfortunitely notfound")
      {
        alert("Wrong password");
      }
       else 
       {
        alert("login sucessful");
        setRedirect(true);
        setUser(data);
        setIsLogin(true);
       }
    } 
    catch (err) 
    {
      alert("error occured",err);
    }

    setLname("");
    setLpass("");
   

  }
  console.log(position);
  console.log(redirect);
  if (redirect && position==="Manufacturer") {
    
    // setRedirect(false);
    return <Navigate to={"/dashbord"} />;

  }
  else if ( redirect && position==="Transporter") {
    
    // setRedirect(false);
    return <Navigate to={"/transporterdashbord"} />;
  }


  return (
    <div className="mt-10 h-[655px] ">
      <h1 className="text-center text-3xl  underline underline-offset-4  font-semibold">
       LOGIN HERE
      </h1>
      <form
        action=""
        onSubmit={registerSubmit}
        className="max-w-md mx-auto border-2 shadow-2xl shadow-black  bg-slate-300 rounded-2xl p-8 mt-10 hover:scale-105 transition hover:delay-200 hover:duration-200 hover:ease-in-out"
      >
        <h1>Select position</h1>
        <select
          name="Select Name"
          required
          className="w-full p-2 rounded-xl mb-2 border border-spacing-2 border-slate-400"
          onChange={(ev) => {
            setPosition(ev.target.value);
          }}
        >
          <option selected>Select one of below option</option>
          <option value="Manufacturer"> Manufacturer</option>
          <option value="Transporter">Transporter</option>
        </select>
        <h1>enter email</h1>
        <input
          type="email"
          name=""
          id=""
          placeholder="youremail.com"
          value={lname}
          required
          onChange={(ev) => setLname(ev.target.value)}
          className="mb-4"
        />
        <h1>enter password</h1>
        <input
          type="password"
          name=""
          id=""
          placeholder="******"
          value={lpass}
          required
          onChange={(ev) => setLpass(ev.target.value)}
          className="mb-4"
        />
        <button className="common-btn w-full my-2">Login</button>
        <div className="text-center text-slate-600 mt-3">
          dont have an account yet ?{" "}
          <Link
            to={"/Register"}
            className=" dark:text-linkclr text-sky-600 underline"
          >
            Register Here
          </Link>
        </div>
      </form>
    </div>
  );
}
