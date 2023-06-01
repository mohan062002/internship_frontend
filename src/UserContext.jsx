import axios from "axios";
const { createContext,useState, useEffect } = require("react");

//creating whole function for using context api
export const UserContext=createContext({});

export function UserContextProvider({children})
{
    const [user,setUser]=useState(null);
    const [ready,setReady]=useState(false);
    const [temp,setTemp]=useState(false);
    const [isLogin,setIsLogin]=useState(false);
    const [searchplace,setSearchplace]=useState([]);
    const [bgcolor,setBgcolor]=useState("light");
    //if we rload the page,the name of logged in user must be there for that we are using use effect function here
    useEffect(()=>{
         //we are initalizing user with value null so once we get t
         //he value we have to mount the profile with name of logined user
        if(!user)
        {
             axios.get("/profile").then(
                ({data})=>{
                    console.log("data return is ",data);
                    setUser(data);
                    
                    setReady(true);//for ensuring data is fetched setting value true
                }
             )    
        }
    },[])
    
    return(
       
       < UserContext.Provider value={{user,setUser,ready,bgcolor,setBgcolor,searchplace,setSearchplace,temp,setTemp,isLogin,setIsLogin}}>
         {children}
        </UserContext.Provider>
    );
}