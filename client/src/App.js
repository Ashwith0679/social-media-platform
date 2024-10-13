import {createBrowserRouter,RouterProvider} from 'react-router-dom'

import Login from './components/Login';
import Register from './components/Register';
import Rootlayout from './components/Rootlayout';
import Userprofile from './components/Userprofile';
import Comment from './components/Comment';
import Myprofile from './components/Myprofile';
import Addpost from './components/Addpost';


function App() {

  const router=createBrowserRouter([
    {
      path:'/',
      element:<Rootlayout/>,
      children:[
        {
          path:'/',
          element:<Register/>
        },
        {
          path:'/Login',
          element:<Login/>
        },
        {
          path:'/Register',
          element:<Register/>
        },
        {
          path: '/userprofile',
          element: <Userprofile />,
          children: [
            {
              path: 'comment', 
              element: <Comment />
            }    
          ]
        },
        {
          path:'myprofile',
          element:<Myprofile/>
        },
        {
          path:'Addpost',
          element:<Addpost/>
        }
      ]
    }
      ])
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
