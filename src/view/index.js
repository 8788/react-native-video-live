import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet
} from 'react-native';
import List from '../component/list.js';
import Slide from '../component/slide.js';

export default class Index extends Component {
    render () {
        return (
            <ScrollView>
                <Slide navigator={this.props.navigator} />
                <List caption="人气主播" mid={40002} navigator={this.props.navigator} />
                <List caption="新秀主播" mid={40004} navigator={this.props.navigator} />
                <List caption="好声音" mid={40006} navigator={this.props.navigator} />
                <List caption="搞笑" mid={40008} navigator={this.props.navigator} />
                <List caption="更多主播" mid={40000} navigator={this.props.navigator} />
            </ScrollView>
        );
    }
};