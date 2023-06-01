import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { Navigate } from "react-router-dom";
import {BsCurrencyRupee} from "react-icons/bs"


export default function Dashbord() {
  const { user, setIsLogin, setUser } = useContext(UserContext);
  let temp;
  let address;
  const [genstring, setGenstring] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [quantity, setQuantity] = useState("");
  const [trans, setTrans] = useState("");

  if (user !== null) {
    temp = user.name;
    address = user.address;
  }

  const [name,setName]=useState("");
  const [data,setData]=useState([]);
  const [data2,setData2]=useState([]);

  //for getting all data from 
  useEffect(() => {
    const fetchData = async () => {
      try {
         let datasend;
         user.name!==null ? datasend= user.name : datasend="null";
         console.log(datasend);
         setName(datasend);
         const {data}= await axios.post('/transportertomanufacturer', { name:datasend });
         const data1=data.data;
         const data2 =data.data2;
         console.log("data1",data1,"       ","data2",data2)
    
         setData(data1);
         setData2(data2);

        } catch (error) {
            console.error(error);
        }
    };

    fetchData();
    console.log(data);
  }, [user]);


  let arr=[];
  if(data!==null && data!==undefined && data.length!==0)
  {
     data.map((items)=>{
        arr.push(
           {name:items.name,
            email:items.email
          }
          ); 
     })
  }

  for(let i=0;i<arr.length;i++)
  {
    console.log(arr[i]);
  }


  const [searchorderid, setSearchorderid] = useState(null);
  const[searchto,setSearchto]=useState(null);
  const[searchfrom,setSearchfrom]=useState(null);
 
 
   async function searchresult(ev) {
         ev.preventDefault();
        const {data}=await axios.post("/searchtransportmessage",{searchorderid,searchto,searchfrom,type:"Man"});
        console.log(data);
         if(data!==null && data!==undefined && data.length!==0)
         {
           setData2(data);
         }
        console.log(searchorderid,searchto,searchfrom);
   }

  //function for generating random alphanumeric string
  function generateAlphanumericString() {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;

    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setGenstring(result);
    return result;
  }
  //function for log out

  const [redirect, setRedirect] = useState(null);

  //function for sending a data to database
  async function sendinfo(ev) {
    ev.preventDefault();
    console.log("transporter value is", trans);
    try {
      axios.post("/manufacturermessages", {
        Mname:temp,
        genstring,
        address,
        to,
        from,
        quantity,
        trans,
      });
      alert("message sent");
    } catch (err) {
      alert("message not sent");
      console.log(err);
    }
    setGenstring("");
    setTo("");
    setFrom("");
    setQuantity("");
    setTrans("");
  }

  // pagination code starts here
  const [currentpage, setCurrentpage] = useState(1);
  const recordperpage = 3;
  const lastindex = currentpage * recordperpage;
  const firstindex = lastindex - recordperpage;
  const records = data2.slice(firstindex, lastindex);
  const npage = Math.ceil(data2.length / recordperpage);

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

  async function logout() {
    await axios.post("/logout");
    setIsLogin(false);
    setRedirect("/");
    setUser(null);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  // Render the rest of your component using the updated currentPage state and other variables

  console.log("user value is ", temp);
  return (
    <div className="h-screen">
      {/* <div className="text-3xl text-center font-serif bg-gradient-to-r from-black space-x-4 to-slate-500  text-white p-1">WELCOME TO MANUFACTURER PANNEL</div> */}

      <div className="grid grid-cols-1 md:grid-cols-5">
        <div className="col-span-2 bg-slate-500 h-full">
          {/* <img src={pic} alt="" className='w-[160px] ml-56 p-8 bg-white rounded-full mt-8'/> */}

          <h1 className="text-center text-2xl font-serif bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 text-white py-3">
            Login as a <span className="uppercase ml-3 underline underline-offset-4">{temp}</span>
          </h1>

          <div className="flex justify-center my-4 gap-6">
            <label htmlFor="" className=" sm:text-xl font-serif mt-2 text-white">
              Generate OrderID For A Transport
            </label>
            <button className="common-btn" onClick={generateAlphanumericString}>
              Generate
            </button>
          </div>
          <h1 className="text-center text-slate-200 font-serif my-4">
            generated string is 
          {genstring?<span className="text-white ml-4">{genstring}</span>:<span className="text-white ml-4">__________</span>}  
          </h1>

          <div className="shadow-2xl shadow-black bg-slate-300 rounded-xl p-6 m-6">
            <h1 className="text-center text-2xl font-serif mb-4 underline underline-offset-4">
              send message to transporter
            </h1>
            <form action="" onSubmit={sendinfo}>
              <h1 className="font-serif font-medium">ORDERID :</h1>
              <input
                type="text"
                placeholder="enter generated order id"
                required
                value={genstring}
              />
              <h1 className="font-serif font-medium">TO:</h1>
              <input
                type="text"
                placeholder="to"
                required
                value={to}
                onChange={(ev) => {
                  setTo(ev.target.value);
                }}
              />
              <h1 className="font-serif font-medium">FROM :</h1>
              <input
                type="text"
                placeholder="from"
                required
                value={from}
                onChange={(ev) => setFrom(ev.target.value)}
              />
              <h1 className="font-serif font-medium">ADDRESS :</h1>
              <input
                type="text"
                value={address}
                required
                placeholder="address"
                name=""
                id=""
              />
              <h1 className="font-serif font-medium">QUANTITY :</h1>
              <select
                name=""
                id=""
                required
                className="w-full p-2 rounded-xl mb-2"
                onChange={(ev) => {
                  setQuantity(ev.target.value);
                }}
              >
                <option selected>select Quantity</option>
                <option value="1 ton">1 ton</option>
                <option value="2 ton">2 ton</option>
                <option value="3 ton">3 ton</option>
              </select>
             
              <h1 className="font-serif font-medium">SELECT TRANSPORTER :</h1>
              <select
                name=""
                id=""
                required
                className="w-full p-2 rounded-xl mb-2"
                onChange={(ev) => {
                  setTrans(ev.target.value);
                }}
              >
                <option selected>Select Transporter</option>
                { arr.map((item)=>{
                  return <option value={item.name}>{item.name}</option>
                })}

              </select>

              <button className="common-btn w-full  my-2">Submit</button>
            </form>
          </div>

          <div className="flex justify-center">
          <button
            className="common-btn flex justify-end my-6"
            onClick={logout}
          >
            Logout
          </button>
          </div>
        </div>
        <div className=" col-span-1 md:col-span-3">

        <div className="">
            <form action="" className=" flex flex-col  md:flex-row  md:justify-center gap-4 py-2 md:py-0 m-4  rounded-xl md:m-0  md:rounded-none px-2  bg-gradient-to-b from-gray-700 via-gray-500 to-slate-300" onSubmit={searchresult}>

              
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

          
          <h1 className="text-center font-serif  text-xl md:text-2xl lg:text-3xl text-slate-600 my-2 underline underline-offset-4 ">
            Messages Received From <span className="text-rose-700">Transporter...</span>
          </h1>

          {data2.map((item) => {
            return (
              <div className="bg-gradient-to-b from-gray-500 via-gray-400 to-slate-300 shadow-2xl shadow-black m-6 p-4  rounded-xl">
                 <div className="grid grid-cols-5">
                  <h1 className="col-span-2 font-semibold text-lg">
                    order id :
                  </h1>
                  <h1 className="col-span-3">{item.orderid}</h1>
                </div>
               
                <div className="grid grid-cols-5">
                  <h1 className="col-span-2 font-semibold text-lg">
                    Transporter name :
                  </h1>
                  <h1 className="col-span-3">{item.from}</h1>
                </div>

                <div className="grid grid-cols-5">
                  <h1 className="col-span-2 font-semibold text-lg">
                    amount :
                  </h1>
                 <div className="flex gap-1 col-span-3">
                 <h1 className="">{item.amount}</h1>  
                 <span className="mt-1"><BsCurrencyRupee/></span>
                 </div>
                </div>

                <div className="grid grid-cols-5">
                  <h1 className="col-span-2 font-semibold text-lg">
                    Message:
                  </h1>
                  <h1 className="col-span-3">{item.message}</h1>
                </div>

                {/* <div className="flex justify-end">
                  <button className="common-btn">Read more</button>
                </div> */}
              </div>
            );
          })}

          <div className=" ml-10 flex justify-center gap-10 my-10">
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
