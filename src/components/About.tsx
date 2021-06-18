import victory from '../assets/victory.png';
import champSelect from '../assets/champSelect.png';
import roleSelect from '../assets/roleSelect.png';

const About = () => {

    return (

<section className="about">
    <div className="wrapper">
        <p className="aboutTitle">What is <span>League of Legends?</span></p>
        <p className="aboutSubTitle">League of Legends</p>
        <p>League of Legends is Riot Games' multiplayer online battle arena - <span className="userBase">MOBA.</span></p>
        <p>Two teams of five players can pick from pool of over <span className="userBase">150 champions</span> with unique abilities and fight to destroy enemy base.</p>
        <p>Over <span className="userBase">120 million</span> user base.</p>

        <div className="aboutImageContainer">
            <div className="explanation">
                <img src={champSelect} alt="explanation about league of legends"></img>
                <span>Select your champion</span>
                <p>over 150 playable champions are waiting to be played by you and new champions are being added to the game every few months. Choose the best champion for you!</p>
            </div>
            
            <div className="explanation">
            <img src={roleSelect} alt="explanation about league of legends"></img>
                <span>Choose your role</span>
                <p>Each players need to choose a specific position / role on the map which offers distinctive experiences and enjoyment.</p>
            </div>
            <div className="explanation">
            <img src={victory} alt="victory screen"></img>
                <span>Destroy the Nexus</span>
                <p>Collaborate with your teammate to destory enemy Nexus and achieve the grand victory! </p>
            </div>

        </div>
        </div>
</section>
            )
}


            export default About;