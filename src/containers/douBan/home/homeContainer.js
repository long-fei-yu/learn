import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity} from 'react-native';
import BaseComponent from '../../baseComponent';
import BaseStyle from '../../../lib/baseStyle';
import Color from '../../../lib/color';
import Dimen from '../../../lib/dimen';
import SearchComponent from '../search/searchComponent';
import HomeContentComponent from './homeContentComponent';
import {keys, save, load} from '../../../lib/storage';

export default class HomeContainer extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            isSearch: false,
            text: '',
        };
        //TextInput对象
        this.input;
    }

    onCancelPress = () => {
        //TextInput 失去焦点
        this.input.blur();

        this.setState({
            isSearch: false,
            text: '',
        })
    };

    onChangeText = (text) => {
        this.setState({
            text,
        })
    };

    onFocus = () => {
        this.setState({
            isSearch: true,
        })
    };

    onSubmitEditing = async () => {
        const {text} = this.state;

        if (text.length === 0) {
            return;
        }

        let value = await load(keys.history);

        if (!value) {
            value = text;
        } else {
            value += ',' + text;
        }

        save(keys.history, value);

        this.push('SearchResults', {text});
    };

    render() {
        const {isSearch, text} = this.state;

        return (
            <SafeAreaView style={BaseStyle.container}>
                <View style={BaseStyle.content}>

                    <View style={styles.head}>
                        <View style={styles.search}>
                            <TouchableOpacity>
                                <Image style={styles.qrCode}
                                       source={require('../../../images/douBan/home/ic_search.png')}/>
                            </TouchableOpacity>
                            <TextInput style={styles.inputText}
                                       ref={(input) => {
                                           this.input = input
                                       }}
                                       placeholder={'请输入电影名'}
                                       clearButtonMode={'while-editing'}
                                       placeholderTextColor={Color.cC0C0C0}
                                       onChangeText={this.onChangeText.bind(this)}
                                       onFocus={this.onFocus.bind(this)}
                                       onSubmitEditing={this.onSubmitEditing.bind(this)}
                                       value={text}
                            />

                            {!isSearch ? (
                                <TouchableOpacity>
                                    <Image style={styles.qrCode}
                                           source={require('../../../images/douBan/home/ic_tv_calendar_normal.png')}/>
                                </TouchableOpacity>
                            ) : null}

                        </View>
                        {isSearch ? (
                            <TouchableOpacity style={styles.cancel} onPress={this.onCancelPress.bind(this)}>
                                <Text style={BaseStyle.s14cFFFFFF}>取消</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>

                    {isSearch ? (
                        <SearchComponent/>
                    ) : (
                        <HomeContentComponent/>
                    )}

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

    head: {
        backgroundColor: Color.c6CB962,
        paddingHorizontal: 15,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },

    search: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 3,
        paddingHorizontal: 5,
        backgroundColor: Color.cFFFFFF,
    },

    inputText: {
        flex: 1,
        height: 25,
        backgroundColor: Color.cFFFFFF,
        fontSize: Dimen.s14,
        color: Color.c333333,
        marginLeft: 5,
    },

    cancel: {
        width: 50,
        height: 25,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    qrCode: {
        width: 23,
        height: 23,
    },

});
