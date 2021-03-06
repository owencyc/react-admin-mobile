import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router'

import App from '../components/app/App'
import test from '../demo/test/test'
import About from '../components/resume/about'
import Home from '../components/resume/home'
import Skill from '../components/resume/skill'
import Verse from '../components/resume/verse'
import Resume from '../components/resume'

const NotFound1 = () => (
    <div style={{ position: "fixed", width: '100%', height: '100%', zIndex: "100", backgroundColor: '#f5f5f9' }}>404</div>
)
const dan = () => (
    <div>
        问题填单
    </div>
)

export default class AppRouter extends Component {
    updateHandle() {
        console.log("换了一页")
    }
    render() {
        return (
            <div className='App'>
                <Switch>
                    <Route path="/" component={Resume} exact />
                    <Route path="/test" component={test} exact />

                    <Route path="/resume-home" component={Home} exact />
                    <Route path="/resume-about" component={About} exact />
                    <Route path="/resume-skill" component={Skill} exact />
                    <Route path="/resume-verse" component={Verse} exact />
                    

                    <Route component={NotFound1} />

                </Switch>
            </div>
        );
    }
}