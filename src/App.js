import Flow from "./components/Flow";
import 'reactflow/dist/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import ProjectList from "./ProjecList";
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import CreateProject from "./CreateProject";

const App = () => {

  const router = createBrowserRouter([{
    path: '/',
    element: <ProjectList></ProjectList>
  }, {
    path: '/projects/flow',
    element: <Flow></Flow>
  },
  {
    path: '/projects/create',
    element: <CreateProject></CreateProject>
  }])

  return (
    <>
      <div className="container-fluid mt-5">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>



  );
}

export default App;
