import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    BackAndroid,
    TouchableOpacity,
    WebView,
    Platform,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Detail extends Component {
    componentDidMount () {
        // 添加 andoroid 返回键事件
        BackAndroid.addEventListener('hardwareBackPress', this._backEvent.bind(this));
    }

    componentWillUnmount () {
        // 移除 andoroid 返回键事件
        BackAndroid.removeEventListener('hardwareBackPress', this._backEvent.bind(this));
    }

    _backEvent () {
        let { navigator } = this.props;
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        } else {
            return false;
        }
    }

    render () {
        let content = <WebView startInLoadingState={true} source={{uri: this.props.url}} />;
        if (Platform.OS === 'android') {
            content = <View style={styles.picWrap}><Image style={styles.pic} source={{uri: this.props.pic}} /></View>;
        }
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backWrap} onPress={() => this.props.navigator.pop()}>
                        <View style={styles.back}></View>
                    </TouchableOpacity>
                    <View style={styles.titleWrap}>
                        <Text style={styles.title} numberOfLines={1}>{this.props.title}</Text>
                    </View>
                    <View style={styles.shareWrap}>
                        <Text style={styles.share}>···</Text>
                    </View>
                </View>
                {content}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    backWrap: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    back: {
        width: 12,
        height: 12,
        marginLeft: 5,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#999',
        transform: [
            {rotate: '45deg'}
        ]
    },
    titleWrap: {
        flex: 1
    },
    title: {
        textAlign: 'center',
        justifyContent: 'center'
    },
    shareWrap: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    share: {
        color: 'transparent'
    },
    picWrap: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    pic: {
        height: width * 0.75
    }
});