import React , {useState} from "react";
import { Link } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Route , BrowserRouter as Router , Switch} from 'react-router-dom';
import AdminHome from './AdminHome';
import ReleaseForm from './ReleaseForm';
import Statistics from './Statistics';
import Companies from './Companies';
import Schedule from './Schedule';
import Resources from './Resources';
import Feedback from './Feedback';
import './AdminDashboard.css';


const AdminDashboard: React.FC = () =>{
    return(
        <Router>
            <div className="admin-dashboard">
                {/* <AdminSidebar /> */}
            
                <div id="main-content" className="dashboard-content">
                    <Switch>
                        <Route path="/admin/home" component={AdminHome} />
                        <Route path="/admin/release-form" component={ReleaseForm} />
                        <Route path="/admin/statistics" component={Statistics} />
                        <Route path="/admin/companies" component={Companies} />
                        <Route path="/admin/schedule" component={Schedule} />
                        <Route path="/admin/resources" component={Resources} />
                        <Route path="/admin/feedback" component={Feedback} />
                        <Route path="*">
                            <h1>Welcome to Admin Dashboard</h1>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default AdminDashboard;