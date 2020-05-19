import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Contact extends Component {
  static propTypes = {
    onClickLink: PropTypes.func.isRequired
  };

  componentDidMount() {
    document.querySelector('title').textContent = 'Abhishek Chaudhuri - Contact';
    document.querySelector('.links-about').classList.remove('selected');
    document.querySelector('.links-projects').classList.remove('selected');
    document.querySelector('.links-contact').classList.add('selected');
  }

	render() {
    const { onClickLink } = this.props;

		return (
			<main className="contact">
        <Link className="arrow-left" to="/projects" aria-label="Go to Projects"
          onClick={() => onClickLink('projects')}>
          <i className="fas fa-arrow-left"/>
        </Link>
        <div className="contact-wrapper">
          <h3 className="contact-heading" tabIndex={0}>Contact</h3>
          {/* Each link opens in a new tab */}
          <span className="contact-row">
            <a className="contact-resume"
              href="https://www.dropbox.com/s/vn3vrkn1a808jd4/Resume%20v6.pdf?dl=0" target="_blank"
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
            {/* Opens default email program */}
            <a className="contact-email" href="mailto:achaudhuri2011@yahoo.com"
              target="_top">
              <i className="fas fa-envelope"/> Email
            </a>
          </span>
        </div>
      </main>
		);
	}
}

export default Contact;
