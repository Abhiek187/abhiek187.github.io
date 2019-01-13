import React, { Component } from 'react';
import projectData from './projects.json';

class Projects extends Component {
  componentDidMount() {
    document.querySelector('title').textContent = 'Abhishek Chaudhuri - Projects';
    document.querySelector('.links-projects').classList.add('selected');
  }

	render() {
    // Extract JSON data as an array
    const projects = JSON.parse(JSON.stringify(projectData));

		return (
      <main className="projects">
			  <h3 className="projects-heading" tabIndex={0}>Projects</h3>
        <ul className="projects-list">
          {projects.map(project => (
            /* Each list item needs a key */
            <li key={project.id}>
              <h4 className="projects-name" tabIndex={0}>{project.name}</h4>
              <img className="projects-image" tabIndex={0} src={project.image}
                alt={'Image of ' + project.name}/>
              <p className="projects-about" tabIndex={0}>{project.about}</p>
              <p className="projects-technology" tabIndex={0}>
                Made Using: {project.technology.join(', ')}
              </p>
              {/* If no project link is directly available, follow directions on GitHub */}
              {project.website ? (
                <a className="projects-website" href={project.website} target="_blank"
                rel="noopener noreferrer">View Project</a>
              ) : (
                <p className="projects-website" tabIndex={0}>&darr; See GitHub link below &darr;</p>
              )}
              <a className="projects-repo" href={project.repo} target="_blank"
                rel="noopener noreferrer">View on GitHub</a>
            </li>
          ))}
        </ul>
        <p className="projects-addendum" tabIndex={0}>...And much more on GitHub!</p>
      </main>
		);
	}
}

export default Projects;
