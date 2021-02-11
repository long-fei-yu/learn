import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ImageBackground} from 'react-native';
import BaseComponent from '../baseComponent';
import BaseStyle from '../../lib/baseStyle';
import NativeUtil from '../../lib/native';

export default class SplashContainer extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {count: 5};
    }

    componentDidMount() {

        //NativeUtil.hideSplash();

        this.countInterval = setInterval(() => {
            let {count} = this.state;
            if (count <= 0) {
                this.replace('Main');
            } else {
                this.setState({count: --count});
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.countInterval);
    }

    render() {
        const {count} = this.state;

        return (
            <SafeAreaView style={BaseStyle.container}>
                <View style={BaseStyle.content}>
                    <TouchableOpacity
                        style={BaseStyle.content}
                        onPress={() => {
                            this.replace('Main');
                        }}>

                        <ImageBackground
                            style={BaseStyle.content}
                            resizeMode={'cover'}
                            source={{uri: 'https://pic3.zhimg.com/v2-5af460972557190bd4306ad66f360d4a.jpg'}}>

                            <TouchableOpacity
                                style={styles.time}
                                onPress={() => {
                                    this.replace('Main');
                                }}>
                                <Text style={BaseStyle.s14cFFFFFF}> {count} 跳过</Text>
                            </TouchableOpacity>

                        </ImageBackground>

                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    time: {
        width: 70,
        height: 30,
        marginTop: 10,
        marginRight: 20,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 15,
    },
});

