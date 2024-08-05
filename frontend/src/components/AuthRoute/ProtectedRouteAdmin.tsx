import React from "react";
import useTokenExpiration from "../../hooks/useTokenExpiration";
import useAuth from "../../hooks/useAuth";

export default function ProtectedRouteAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  useTokenExpiration();
  return user?.isAdmin ? children : <Navigate to={`/`} replace />;
}

//    useEffect(()=>{
//     if(token && jwtDecode(token).isAdmin){
//       presentPage()
//     }
//   },[token && jwtDecode(token).role!== "user"])

//   const decodedData = jwtDecode(token);

//   if (decodedData.role === "user") {
//     return <Outlet {...props} />;
//   }
//  else if(decodedData.role!=="admin"){
