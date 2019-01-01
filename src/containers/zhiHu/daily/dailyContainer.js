import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import BaseComponent from '../../baseComponent';
import BaseStyle from "../../../lib/baseStyle";
import Color from '../../../lib/color';
import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types';
import  NewsCcomponent from '../newsCcomponent';

export default class DailyContainer extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            topStories: [1, 2, 3, 4],
            stories: [1, 2, 3, 4],
        };
    }

    onTopPress = () => {

    };

    onPress = () => {
        this.push('DailyDetail');
    };

    render() {
        const {topStories, stories} = this.state;

        return (
            <View style={BaseStyle.container}>

                <View style={styles.wrapper}>
                    <Swiper height={400} autoplay={true} paginationStyle={{bottom: 10}}>

                        {topStories.map((data, index) => {
                            return (<View>
                                <Carousel key={index}
                                          onPress={this.onTopPress}
                                          title={'dajflakfjlak'}
                                          image={'https://pic4.zhimg.com/v2-d2a42e90887bbf56b7fb7de3a7723f2f.jpg'}/>
                            </View>)
                        })}
                    </Swiper>
                </View>

                <View style={styles.time}>
                    <Text style={BaseStyle.s14cFFFFFF}>今日新闻</Text>
                </View>


                {stories.map((data, index) => {
                    return <NewsCcomponent key={index}
                                           url={'https://pic4.zhimg.com/v2-e70647e35eb09ce571546426727aa2df.jpg'}
                                           title={'瞎扯：如何正确地吐槽瞎扯：如何正确地吐槽瞎扯：如何正确地吐槽瞎扯：如何正确地吐槽'}
                                           onPress={this.onPress}/>

                })}

            </View>
        );
    }
}

class Carousel extends Component {

    static propTypes = {
        image: PropTypes.string,
        title: PropTypes.string,
        onPress: PropTypes.func,
    };

    static defaultProps = {
        image: '',
        title: '',
        onPress: null,
    };

    render() {
        const {image, title, onPress} = this.props;

        return (
            <TouchableOpacity onPress={onPress}>
                <ImageBackground source={{uri: image}} style={styles.wrapper} resizeMode={'cover'}>
                    <View style={styles.txt}>
                        <Text style={[BaseStyle.s18cFFFFFF, styles.title]}>{title}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: 200,
        width: deviceParameter.pw,
    },

    txt: {
        flex: 1,
        justifyContent: 'flex-end'
    },

    title: {
        paddingHorizontal: 15,
        marginBottom: 20,
    },

    time: {
        backgroundColor: Color.c2EBDED,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
