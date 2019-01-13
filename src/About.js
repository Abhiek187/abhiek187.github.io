import React, { Component } from 'react';

class About extends Component {
  componentDidMount() {
    document.querySelector('title').textContent = 'Abhishek Chaudhuri - About';
    document.querySelector('.links-about').classList.add('selected');
  }

	render() {
    const bio = 'Abhishek Chaudhuri is a college student from North Brunswick, New Jersey. He studies' +
      ' at Rutgers University-New Brunswick, majors in Computer Engineering, and minors in Computer' +
      ' Science. He excels in subjects like math and science and has a strong penchant for' +
      ' programming and technology. Some of his hobbies include doing taekwondo, playing the flute &' +
      ' piccolo, and playing video games. His ultimate goal in life is to help make society better' +
      ' for everyone. He can put his technical skills to good use by gaining experience from working' +
      ' with other companies who value his ambitions.';

		return (
      <main className="about">
        <h3 className="about-heading" tabIndex={0}>About</h3>
        <div className="about-container">
          <img className="about-headshot" tabIndex={0}
            src="/img/Headshot.png" alt="Headshot of Abhishek"/>
          <p className="about-bio" tabIndex={0}>{bio}</p>
        </div>
      </main>
		);
	}
}

export default About;
