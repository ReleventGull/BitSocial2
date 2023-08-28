import { Outlet, useLocation} from "react-router-dom";
const settingsObj = ['Account', 'Privacy']
const Settings = () => {
    const loc = useLocation()
    
    return (
        <div className="settingsPage">
            <div className="settingOptions">
                <p className="settingsTitle">USER SETTINGS</p>
                <div className="settingsList">
                    {settingsObj.map(i =>
                        <div className={'optionSettings' + (`/settings/${i.toLowerCase()}` == loc.pathname ? ' active' : '')}>
                            {i}
                        </div>
                        )}
                </div>
            </div>


        <div className="outletSettings">
            <Outlet />
        </div>
        

        <div className="exitSettingsBox">
            <div className="exitBox">
                <div className="circleContainer">
                    <p>X</p>
                </div>
                <h4>ESC</h4>
            </div>
        </div>
    </div>
    )
}

export default Settings