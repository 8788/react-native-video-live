import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';
import Detail from '../view/detail.js';

const { width, height } = Dimensions.get('window');

export default class slide extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data: []
        }
    }

    _fetchSlideData () {
        fetch('http://video.browser.qq.com/api/get_beauty_datas?type=40001&num=6').then(res => res.json()).then(res => {
            this.setState({data: res.data.slice(1)});
        }).catch(err => {
            console.error(err);
        });
    }

    _onPressItem (item) {
        this.props.navigator.push({
            component: Detail,
            params: {
                url: item.url,
                title: item.title,
                pic: item.pic
            }
        });
    }

    componentWillMount () {
        this._fetchSlideData();
    }

    render () {
        let list = this.state.data.map(item => {
            return (
                <TouchableOpacity style={styles.item} activeOpacity={1} key={item.rid} onPress={() => this._onPressItem(item)}>
                    <Image resizeMode="cover" style={styles.pic} source={{uri: item.pic}} />
                </TouchableOpacity>
            );
        });
        return (
            <Swiper style={styles.slide} height={width * 0.6} showsButtons={true} autoplay={true}>
                {list}
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        flex: 1
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginBottom: 10
    },
    pic: {
        flex: 1
    }
});