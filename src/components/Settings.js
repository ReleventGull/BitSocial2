

const Settings = ({setToken}) => {
    
    return (
        <div className="outlet Settings">
                <div onClick={() => {window.localStorage.removeItem('token'), setToken('')}} className="imageBox">
                        <img src='/images/Logout.png'/>
                        <h3>Logout</h3>
                    
                </div>
        </div>
    )
}
export default Settings