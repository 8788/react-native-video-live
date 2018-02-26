import React, { Component } from 'react';
import {
    Navigator,
    StyleSheet,
    Platform
} from 'react-native';
import Index from '../view/index.js';

export default class Navigation extends Component {
    _renderScene(route, navigator) {
        let Component = route.component;
        return (
            <Component {...route.params} navigator={navigator} />
        );
    }

    render () {
        return (
            <Navigator
                style={Platform.OS === 'ios' && styles.iosAdjust}
                initialRoute={{component: Index}}
                configureScene={() => Navigator.SceneConfigs.FloatFromRight}
                renderScene={this._renderScene.bind(this)}/>
        );
    }
};


const styles = StyleSheet.create({
    iosAdjust: {
        marginTop: 20,
        backgroundColor: '#f5f5f5'
    }
});