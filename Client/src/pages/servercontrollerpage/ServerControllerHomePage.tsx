import { useParams } from "react-router-dom";
import NavTab from "../../globaltsx/NavTab";

function ServerControllerHomePage(){
    let { serverid } = useParams();
    return (
        <div className="controllerhome-container">
        <div className='controllerhome-buttons'>
            <NavTab 
                title='Player Settings' 
                description='Pas de instellingen van de spelers op de server aan' 
                path={'/controller/servers/edit/player/' + serverid}
            />
            <NavTab 
                title='Server Settings' 
                description='Voer verschillende acties uit op de server' 
                path={'/controller/servers/edit/server/' + serverid}
            />
            <NavTab 
                title='Extra Settings' 
                description='Bekijk de verschillende extra instellingen' 
                path={'/controller/servers/edit/extra/' + serverid}
            />
        </div>
    </div>
    );
}
export default ServerControllerHomePage;