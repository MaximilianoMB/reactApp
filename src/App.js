import React, { Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import ErrorBoundry from './errorBoundry';



class App extends Component {
    constructor() {
        super()
        this.state = {
            robots:[],
            searchfield: '',
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users/')
            .then(response =>response.json())
            .then(users => this.setState({ robots: users }))   
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render() {
        const filteredRobots = this.state.robots.filter(robot =>{
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        });
        return(
            <div className='tc'>
                <h1 className="titulo">Roboletas</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={ filteredRobots }/>
                    </ErrorBoundry>
                    
                </Scroll>
                
            </div>
        );
    }
}

export default App;