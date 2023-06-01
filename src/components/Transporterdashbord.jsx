import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";


export default function Transporterdashbord() {
  const { user, setUser, setIsLogin } = useContext(UserContext);
  const [price, setPrice] = useState(0);
  const [orderid, setOrderid] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]); // Initialize data state as null

  useEffect(() => {
    const fetchData = async () => {
      try {
        let datasend;
        user.name !== null ? (datasend = user.name) : (datasend = "null");
        console.log(datasend);
        setName(datasend);
        const response = await axios.post("/getallorderid", { name: datasend });
        const responseData = response.data;
        //  console.log(responseData);
        setData(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    // console.log(data);
  }, [user]);


const [searchorderid, setSearchorderid] = useState(null);
 const[searchto,setSearchto]=useState(null);
 const[searchfrom,setSearchfrom]=useState(null);


  async function searchresult(ev) {
        ev.preventDefault();
       const {data}=await axios.post("/searchtransportmessage",{searchorderid,searchto,searchfrom,type:"Trans"});
       console.log(data);
        if(data!==null && data!==undefined && data.length!==0)
        {
          setData(data);
          setSearchorderid(null);
          setSearchto(null);
          setSearchfrom(null);
        }

       console.log(searchorderid,searchto,searchfrom);
  }

  const [currentpage, setCurrentpage] = useState(1);
  const recordperpage = 3;
  const lastindex = currentpage * recordperpage;
  const firstindex = lastindex - recordperpage;
  const records = data.slice(firstindex, lastindex);
  const npage = Math.ceil(data.length / recordperpage);

  const prev = () => {
    if (currentpage !== 1) {
      setCurrentpage(currentpage - 1);
      console.log(window.innerWidth);
    }
  };

  const next = () => {
    if (currentpage !== npage) {
      setCurrentpage(currentpage + 1);
    }
  };

  let arr = [];

  if (data !== null && data !== undefined && data.length !== 0) {
    data.map((items) => {
      arr.push(items.Mid + "+" + items.Mname);
    });
  }

  // for(let i=0;i<arr.length;i++)
  // {
  //   console.log(arr[i]);
  // }

  //function for sending a data to database
  async function sendinfo(ev) {
    ev.preventDefault();
    try {
      axios.post("/Transportermessage", {
        price,
        name,
        orderid,
        message,
      });
      alert("message sent");
    } catch (err) {
      alert("message not sent");
      console.log(err);
    }
  }

  const [redirect, setRedirect] = useState(null);

  async function logout() {
    await axios.post("/logout");
    setIsLogin(false);
    setRedirect("/");
    setUser(null);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

   






  return (
    <div className="">
      {/* <div className="text-3xl text-center font-serif bg-gradient-to-r from-black via-slate-700 to-slate-500 space-x-4  text-white p-1">WELCOME TO TRANSPORTER PANNEL</div> */}
      <div className="grid  grid-cols-1 md:grid-cols-5 h-screen ">
        <div className="col-span-1 md:col-span-2 sm:bg-slate-500 h-full">
          {/* <img src={pic} alt="" className='w-[160px] ml-56 p-8 bg-white rounded-full mt-8'/> */}

          <h1 className="text-center text-2xl font-serif bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 text-white py-3">
            Login as a{" "}
            <span className="uppercase ml-3 underline underline-offset-4">
              {name}
            </span>
          </h1>

          <div className="bg-slate-300 shadow-2xl shadow-slate-900 rounded-xl p-8 m-6 mt-16">
            <h1 className="text-center sm:text-xl md:text-2xl font-serif mb-4 underline underline-offset-4 ">
              SEND MESSAGE TO MANUFACTURER
            </h1>
            <form action="" onSubmit={sendinfo}>
              <h1 className="font-serif font-medium">Enter orderid :</h1>
              <select
                name=""
                id=""
                required
                className="w-full p-2 rounded-xl mb-2"
                onChange={(ev) => {
                  setOrderid(ev.target.value);
                  console.log(ev.target.value);
                  // console.log(ev.target.value.name);
                }}
              >
                {arr.map((item) => {
                  return <option value={item}>ID:{item}</option>;
                })}
              </select>

              <h1 className="font-serif font-medium">Enter price :</h1>
              <input
                type="number"
                id="price"
                name="price"
                required
                min="0"
                max="10000000"
                step="0.001"
                value={price}
                onChange={(ev) => {
                  setPrice(ev.target.value);
                }}
              />

              <h1 className="font-serif font-medium">Enter Message:</h1>
              <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="enter your address..."
                value={message}
                onChange={(ev) => {
                  setMessage(ev.target.value);
                }}
              ></textarea>

              <button className="common-btn w-full  my-2">Submit</button>
            </form>
          </div>

          <div className="flex justify-center">
          <button
            className=" bg-red-700 px-6 py-2 hover:bg-red-600 hover:scale-105 transition  duration-300 rounded shadow-2xl text-white my-4 "
            onClick={logout}
          >
            Logout
          </button>
          </div>

        </div>
        <div className=" col-span-1 md:col-span-3">


        <div className="">
            <form action="" className=" flex flex-col  md:flex-row  md:justify-center gap-4 py-2 md:py-1 m-4 rounded-xl md:m-0  md:rounded-none px-4  bg-gradient-to-b from-gray-700 via-gray-500 to-slate-300" onSubmit={searchresult}>

              
              <div className=" grid grid-cols-3 lg:flex gap-x-1 ">
              <h1 className="col-span-1  mt-5 font-medium">ORDERID </h1>
              <input type="text" className="col-span-2 my-3" onChange={(ev)=>setSearchorderid(ev.target.value)} />
              </div>

              
              <div className="  grid grid-cols-3  lg:flex gap-x-1 ">
              <h1 className=" col-span-1 mt-5 font-medium">TO </h1>
              <input type="text" className="col-span-2 my-3" onChange={(ev)=>setSearchto(ev.target.value)} />
              </div>

              
              <div className="  grid grid-cols-3  lg:flex gap-x-1 ">
              <h1 className=" col-span-1 mt-5 font-medium">FROM</h1>
              <input type="text" className="col-span-2 my-3" onChange={(ev)=>setSearchfrom(ev.target.value)}/>
              </div>

             <div className="mt-1 md:my-2 flex justify-center sm:flex-none  ">
             <button className="common-btn">Search</button>
             </div>
              
            </form>
          </div>




          <h1 className="text-center font-serif text-xl md:text-2xl lg:text-3xl text-slate-600 my-2 underline underline-offset-4 ">
            Messages Received From{" "}
            <span className="text-rose-700">Manufacturer...</span>
          </h1>

          {records !== null &&
            records.map((item) => {
              return (
                <div className="bg-slate-300 shadow-2xl shadow-black m-6 p-4  rounded-xl">
                  <div className="grid grid-cols-2 md:grid-cols-5">
                    <h1 className="col-span-1 font-semibold text-lg">
                      Order-id :
                    </h1>
                    <h1 className=" col-span-1 md:col-span-4">{item.Mid}</h1>
                  </div>
                  <div className="grid  grid-cols-2  md:grid-cols-5 gap-8">
                    <h1 className="col-span-1 font-semibold text-lg">
                      delivary to:
                    </h1>
                    <h1 className=" col-span-1 md:col-span-4">{item.to}</h1>
                  </div>
                  <div className="grid  grid-cols-2 md:grid-cols-5 gap-8">
                    <h1 className="col-span-1 font-semibold text-lg">
                      delivary from:
                    </h1>
                    <h1 className="col-span-1 md:col-span-4">{item.from}</h1>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    <h1 className="col-span-1 font-semibold text-lg">
                      Quantity:
                    </h1>
                    <h1 className=" col-span-1 md:col-span-4">{item.quantity}</h1>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 ">
                    <h1 className="col-span-1 font-semibold text-lg">
                      Mnufacturer Name :
                    </h1>
                    <h1 className=" col-span-1 md:col-span-4">{item.Mname}</h1>
                  </div>
                  {/* <div className="flex justify-end ">
                    <button className="common-btn">Read more</button>
                  </div> */}
                </div>
              );
            })}

          <div className=" flex justify-center gap-10 my-10">
            <button
              onClick={prev}
              className="bg-red-700 hover:bg-red-600 rounded-xl px-6 py-2 text-white "
            >
              PREV
            </button>
            <h1 className="text-xl underline underline-offset-2 ">
              {currentpage} of {npage}
            </h1>
            <button
              onClick={next}
              className="bg-red-700 hover:bg-red-600 rounded-xl px-6 py-2 text-white "
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
