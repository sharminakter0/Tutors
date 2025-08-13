import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import Home from "../components/Home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/Login/Login";
import Addtutior from "../pages/AddTutior/Addtutior";
import FindTutior from "../pages/FindTutior/FindTutior";
import TutorDetails from "../pages/DetailsTutor/TutorDetails";
import PrivateRoute from "../Private/PrivateRoutes/Privateroute";
import BookedTutor from "../pages/BookedTutor/BookedTutor";
import { savedTutorsLoader } from "../savedTutorsLoader";
import MyTutors from "../pages/MyTutors/MyTutors";
// import { myTutorsLoader } from "../myTutorsLoader";
import Error from "../components/Error/Error";
import { envVars } from "../config";
import AllCampaigns from "../pages/Allcampign/AllCampaigns";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import MyProfile from "../components/MyProfile/MyProfile";

import About from "../components/About/About";

export const router = createBrowserRouter([
    
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      // {
      //   path: "/add-tutiour",
      //   element: 
      //         <PrivateRoute>
            
      //       <Addtutior></Addtutior>
      //      </PrivateRoute>
        
      // },
      // {
      //   path : '/my-tutor',
      
      //   element : <PrivateRoute> <MyTutors></MyTutors> </PrivateRoute> 
      // },
      {
        path: "/find-tutior",
        loader: () =>fetch(`${envVars.backend_origin}/addtutior`),
        element: <FindTutior></FindTutior>,
    
      },
      {
        path: "/tutor-details/:id",
        loader: () =>fetch(`${envVars.backend_origin}/addtutior`),
        element: <TutorDetails></TutorDetails>  ,
      },
      

      //  {
      //   path: "/my-booked-tutors",
      //    loader: savedTutorsLoader,
      //   element:
      //     <PrivateRoute> <BookedTutor></BookedTutor></PrivateRoute>
      //   ,
      // },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
       path: '/all-campaigns',
       element: <AllCampaigns />
     },

     {
      path:"/about",
      element:<About></About>
     }

      
    ],
    
  },


  {
         path:"/dashboard",
         element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
         children:[
          {
            index:true,
            element:<MyProfile></MyProfile>
          },
          {

            path:"/dashboard/my-profile",
            element:<MyProfile></MyProfile>
          }
           ,{
        path: "/dashboard/my-booked-tutors",
         loader: savedTutorsLoader,
        element:
         <BookedTutor></BookedTutor>
        
      },
        {
        path: "/dashboard/add-tutiour",
        element:<Addtutior></Addtutior>
        
      },
            {
        path : '/dashboard/my-tutor',
      
        element : <MyTutors></MyTutors>  
      },
          

          
         ]
         
  },
  {
        path :"/*",
        element : <Error></Error>
        
      }
]);
