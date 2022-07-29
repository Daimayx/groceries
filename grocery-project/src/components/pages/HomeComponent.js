import background from "../pictures/background.jpg";
import "../css/home.css";
import {useNavigate} from 'react-router-dom';


export default function HomePage() {
    const navigate = useNavigate()
    function discoverMoreBtnClicked(){
        navigate("/about")
    }
    return (
        <div>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
            <link href="https://fonts.googleapis.com/css2?family=Gideon+Roman&display=swap" rel="stylesheet"/>

            <div className="main-container" style={{
                backgroundImage: `url(${background}) no-repeat center center fixed`
                , backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', height: '200%'
            }}>
                <div className="inner-container">
                    <div className="banner first-text ">
                        <p>
                            Ride <br/>
                            Your own Bike<br/>
                            Where ever <br/>
                            you Go<br/>
                        </p>
                    </div>
                    <div className="banner second-text">
                        <p>
                            Join us today to travel to
                            your dream places in your own bike and let
                            us help you reach your
                            destination
                        </p>
                    </div>
                </div>

                <div className="l-container center vh70">
                    <div className="wrap">
                        <button className="discover-button" onClick={discoverMoreBtnClicked}>Discover More...</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
