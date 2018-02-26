import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ListView,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Detail from '../view/detail.js';

const { width, height } = Dimensions.get('window');

export default class list extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            data: ds
        };
    }

    _fetchListData () {
        let url = 'http://video.browser.qq.com/api/get_beauty_datas?type=' + this.props.mid + '&num=7';
        if (this.props.mid === 40000) {    // 更多主播
            url = 'http://video.browser.qq.com/api/get_beauty_all_datas?start=0&num=7';
        }
        fetch(url).then(res => res.json()).then(res => {
            this.setState({data: this.state.data.cloneWithRows(res.data.slice(1))});
        }).catch (err => {
            console.log(err);
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

    _renderListItem (item) {
        return (
            <TouchableOpacity style={styles.item} activeOpacity={1} onPress={() => this._onPressItem(item)}>
                <Image style={styles.pic} source={{uri: item.pic}} />
                <View style={styles.titleWrap}>
                    <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    componentWillMount () {
        this._fetchListData();
    }

    render () {
        return (
            <View>
                <View style={styles.captionWrap}>
                    <Text style={[styles.caption, this.state.data.getRowCount() ? styles.show : styles.hide]}>{this.props.caption}</Text>
                </View>
                <ListView
                    contentContainerStyle={styles.list}
                    dataSource={this.state.data}
                    renderRow={this._renderListItem.bind(this)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    captionWrap: {
        height: 30,
        paddingLeft: 10,
        justifyContent: 'center'
    },
    caption: {
        color: '#333',
        fontSize: 14
    },
    list: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    show: {
        opacity: 1
    },
    hide: {
        opacity: 0
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        width: width / 2,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    pic: {
        flex: 1,
        height: (width / 2 - 20) * 0.75
    },
    titleWrap: {
        height: 36,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 12,
        textAlign: 'center',
        color: '#333'
    }
});