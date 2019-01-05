import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import headshot from './img/IMG_0987.JPG';

class App extends Component {
  render() {
    const bio = "Abhishek Chaudhuri is a college student from North Brunswick, New Jersey. He studies" +
      " at Rutgers University-New Brunswick, majors in Computer Engineering, and minors in Computer" +
      " Science. He excels in subjects like math and science and has a strong penchant for programming" +
      " and technology. Some of his hobbies include doing taekwondo, playing the flute & piccolo, and" +
      " playing video games. His ultimate goal in life is to help make society better for everyone." +
      " He can put his technical skills to good use by gaining experience from working with other" +
      " companies who value his ambitions.";

    return (
      <div className="App">
        <header className="heading">Abhishek Chaudhuri</header>
        <nav className="links">About Projects Contact</nav>
        <hr/>
        <main className="about">
          <img className="about-headshot" src={headshot} alt="Headshot of Abhishek"/>
          <p className="about-bio">{bio}</p>
        </main>
        <hr/>
        <footer className="foot">Made using React</footer>
      </div>
    );
  }
}

export default App;
