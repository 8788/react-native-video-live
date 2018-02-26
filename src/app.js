import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import Navigation from './component/navigation.js';
import Index from './view/index.js';

export default class App extends Component {
    render () {
        return (
            <Navigation />
        );
    }
};