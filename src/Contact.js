import React, { Component } from 'react';

class Contact extends Component {
	render() {
    document.getElementsByTagName('title')[0].textContent = 'Abhishek Chaudhuri - Contact';

		return (
			<main className="contact">
        <h3 className="contact-heading">Contact</h3>
        <a className="contact-resume"
          href="https://www.dropbox.com/s/05i2g7mmehfck9u/Resume%20v2.pdf?dl=0" target="_blank"
          rel="noopener noreferrer">
          <i className="fas fa-file-pdf"/> Resume
        </a>
        <a className="contact-linkedin" href="https://www.linkedin.com/in/abhiek187"
          target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin-in"/> LinkedIn
        </a>
        <a className="contact-github" href="https://github.com/abhiek187"
          target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"/> GitHub
        </a>
        <a className="contact-email" href="mailto:achaudhuri2011@yahoo.com"
          target="_top">
          <i className="fas fa-envelope"/> Email
        </a>
      </main>
		);
	}
}

export default Contact;
