import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

export default function RegisterPage() {
  const [position,setPosition]=useState('');
  const [name,setName] = useState('');
  const [address,setAddress]=useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confpassword,setConfpassword] = useState('');

  async function registerUser(ev) {
    ev.preventDefault();
    console.log(name,email,password,confpassword,position);
    try {
      await axios.post('/register', {
        name,
        email,
        address,
        position,
        password,
        confpassword
      });
      alert('Registration successful. Now you can log in');
    } catch (e) {
      alert('Registration failed. Please try again later');
    }
    setName('');
    setEmail('');
    setAddress('');
    setPosition('');
    setPassword('');
    setConfpassword('');
  }

  return (

    <div className="">
  

       <h1 className="text-center mt-4 mb-6 text-4xl font-serif text-blue-600 underline underline-offset-2">REGISTER NOW</h1>
      
    
      <div className="">
      <form className="max-w-xl mx-6 md:mx-auto bg-slate-300 shadow-2xl shadow-black border border-spacing-8 border-slate-400 rounded-2xl p-4  hover:scale-105 transition hover:delay-200 hover:duration-200 hover:ease-in-out" onSubmit={registerUser}>
          <h1>Select Position</h1>
          <select name="Select Name" className="w-full p-2 rounded-xl mb-2 border border-spacing-2 border-slate-300" onChange={(ev)=>{setPosition(ev.target.value)}}>
            <option selected>Select one of below option</option>
            <option value="Manufacturer" > Manufacturer</option>
            <option value="Transporter">Transporter</option>
          </select>
          <h1>Enter Name</h1>
          <input type="text"
                 placeholder="John Doe"
                 required
                 value={name}
                 onChange={ev => setName(ev.target.value)} />
          <h1>Enter Email</h1>
          <input type="email"
                 placeholder="your@email.com"
                 value={email}
                 required
                 onChange={ev => setEmail(ev.target.value)} />
          
<h1>Address</h1>
<textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="enter your address..."value={address} onChange={(ev)=>{setAddress(ev.target.value)}}></textarea>

          <h1>Enter Password</h1>
          <input type="password"
                 placeholder="password"
                 value={password}
                 required
                 onChange={ev => setPassword(ev.target.value)} />
          <h1>Confirm Password</h1>
          <input type="password"
                 placeholder="confirm password"
                 value={confpassword}
                 required
                 onChange={ev => setConfpassword(ev.target.value)} />
          <button className="common-btn w-full mt-2">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}