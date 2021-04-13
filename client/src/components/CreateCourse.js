import { Component } from 'react'; 

export default class CreateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseTitle: '',
      courseAuthor: 'Joe Smith',
      courseDescription: '',
      estimatedTime: '',
      materialsNeeded: ''
    }
  }

  render() {
    return (
      <div className="wrap">
                <h2>Create Course</h2>
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        <li>Please provide a value for "Title"</li>
                        <li>Please provide a value for "Description"</li>
                    </ul>
                </div>
                <form>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={this.state.courseTitle} onChange={this.change}/>

                            <label htmlFor="courseAuthor">Course Author</label>
                            <input id="courseAuthor" name="courseAuthor" type="text" value={this.state.courseAuthor} onChange={this.change}/>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea onChange={this.change} id="courseDescription" name="courseDescription"></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={this.state.estimatedTime} onChange={this.change}/>

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea onChange={this.change} id="materialsNeeded" name="materialsNeeded"></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit" onSubmit={this.submit}>Create Course</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button>
                </form>
            </div>
    );
  }

  change = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  submit = () => {

  }

  cancel = (e) => {
    e.preventDefault();
    this.props.history.push('/api/courses');
  }
}