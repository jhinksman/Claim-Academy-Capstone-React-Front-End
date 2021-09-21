import Header from "../header/Header";
import SignUp from "../signup/SignUp";
import {Route, withRouter} from 'react-router-dom';
import AboutUs from "../about us/AboutUs";
import ThankYou from "../thank you/ThankYou";
import Home from "../home/Home"
import Monsters from "../home/monsters/Monsters";
import Genes from "../home/genes/Genes";
import MonsterPlanner from "../home/monsterPlanner/MonsterPlanner";
import Scoreboard from "../home/monsterPlanner/Scoreboard";
import Board from "../home/monsterPlanner/Board";
import MonsterSaved from "../monster saved/MonsterSaved";
import LandingPage from "../home/landing page/LandingPage";
import SavedMonsters from "../home/savedMonsters/SavedMonsters";



function Layout() {
    if(localStorage.getItem('loggedInUser')){
        return(
            <div className="Layout">
            <Header />
            <Route path="/about-us" component={AboutUs}/>
            <Route path="/home" component={Home}/>
            <Route path="/monsters" component={Monsters}/>
            <Route path="/genes" component={Genes}/>
            <Route path="/monster-saved" component={MonsterSaved}/>
            <Route path="/saved-monsters" component={SavedMonsters}/>
            <Route path="/monster-planner" component={MonsterPlanner}/>
            <Route path="/scoreboard" component={Scoreboard}/>
            <Route path="/board" component={Board}/>            
            </div>
        );
    }

    else{
  return (
    <div className="Layout">
      <Header />
      <Route path="/landing" component={LandingPage}/>
      <Route path="/about-us" component={AboutUs}/>
      <Route path="/sign-up" component={SignUp}/>
      {/* <Route exact path="/" component={SignUp}/> */}
      <Route path="/thank-you" component={ThankYou}/>
      <Route path="/home" component={Home}/>
      
    </div>
  );
}
}

export default withRouter(Layout);
