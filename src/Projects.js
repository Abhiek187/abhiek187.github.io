import React, { Component } from 'react';

class Projects extends Component {
	render() {
    document.getElementsByTagName('title')[0].textContent = 'Abhishek Chaudhuri - Projects';

		return (
      <main className="projects">
			  <h3 className="projects-heading">Projects</h3>
      </main>
		);
	}
}

export default Projects;
