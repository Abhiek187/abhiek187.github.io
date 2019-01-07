import React, { Component } from 'react';

class About extends Component {
	render() {
    const bio = "Abhishek Chaudhuri is a college student from North Brunswick, New Jersey. He studies" +
      " at Rutgers University-New Brunswick, majors in Computer Engineering, and minors in Computer" +
      " Science. He excels in subjects like math and science and has a strong penchant for" +
      " programming and technology. Some of his hobbies include doing taekwondo, playing the flute &" +
      " piccolo, and playing video games. His ultimate goal in life is to help make society better" +
      " for everyone. He can put his technical skills to good use by gaining experience from working" +
      " with other companies who value his ambitions.";
    document.getElementsByTagName('title')[0].textContent = 'Abhishek Chaudhuri - About';

		return (
      <main className="about">
        <h3 className="about-heading">About</h3>
        <img className="about-headshot" src="/img/IMG_0987.JPG" alt="Headshot of Abhishek"/>
        <p className="about-bio">{bio}</p>
      </main>
		);
	}
}

export default About;
