import './App.css';
import React, {useEffect} from 'react';
import Nav from "../Nav/Nav";
import {BrowserRouter,Switch,Route,Redirect} from "react-router-dom";
import Registration from "../Auth/Registration";
import Login from "../Auth/Login";
import Post from "../Post/Post";

import Profile from "../Profile/Profile";


import Vacantion from "../Vacantions/Vacantions";
import VacantionsForm from "../VacantionForm/VacantionForm";

import {useDispatch, useSelector} from "react-redux";
import {axiosAuth} from "../../redux/Thunk/Thunk";
import Student from "../Student/Student";
import AdminList from "../AdminList/AdminList";
import RequestStudent from "../RequestStudent/RequestStudent";
import RequestStudentParams from "../RequestStudentParams/RequestStudentParams";
import Vacantions from "../Vacantions/Vacantions";
import Search from "../Search/Search";
import OrganizationList  from '../OrganizationList/OrganizationList'
import OrganizationView from '../OrganizationView/OrganizationView';


function App() {
    const isAuth = useSelector(state => state.student.currentStudent.isAuth)
    const dispatch = useDispatch()
    const admin = useSelector(state =>state.student.currentStudent.admin)


    useEffect(() => {
        dispatch(axiosAuth())
    }, [dispatch])

  return (
      <BrowserRouter>
    <div className="App">
        <Nav/>
        <div className="wrap">
            {!isAuth?
                <Switch>
                    <Route path="/registration" component={Registration}/>
                    <Route exact path="/" component={Login}/>
                </Switch>
                :null}
            {isAuth && !admin?
                <Switch>
                    <Route exact path="/" component={Profile}/>
                    <Route path='/search' component ={Search}/>
                    <Route path='/student' component ={Student} />
                    <Route path="/organizations" component={OrganizationList}/>
                    <Route path="/organizations/org:id" component={OrganizationView}/>
                    <Route path='/vacantions' component ={Vacantion} />
                    <Route path='/vacantionsForm' component ={VacantionsForm} />
                </Switch>:null
            }
            {admin?
                <Switch>
                    <Route exact path='/' component={AdminList}/>
                    <Route path='/admin/student/:id' component={RequestStudentParams}/>
                </Switch> : null
            }

        </div>
    </div>
      </BrowserRouter>
  )
}

export default App;
