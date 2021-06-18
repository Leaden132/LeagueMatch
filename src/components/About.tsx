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
                <span>Select a champion</span>
                <p>There are currently over 150 playable champions and new ones are added every few months. Find the best one for you!</p>
            </div>
            
            <div className="explanation">
            <img src={roleSelect} alt="explanation about league of legends"></img>
                <span>Choose your role</span>
                <p>Each of the five players on a LoL team chooses a specific position on the map that offers its own experience and expectations.</p>
            </div>

            <div className="explanation">
            <img src={victory} alt="victory screen"></img>
                <span>Destroy the base</span>
                <p>Work together with your team to complete your ultimate goal — destroying the enemy Nexus, the heart of their base.</p>
            </div>

        </div>
        </div>
</section>
            )
}


            export default About;