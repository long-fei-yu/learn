import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import BaseComponent from '../../baseComponent';
import BaseStyle from "../../../lib/baseStyle";
import Http from '../../../lib/http';
import {URLS} from '../../../lib/urls';
import NewsCcomponent from '../newsCcomponent';


export default class PopularContainer extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        Http.get({url: URLS.hot}, (res) => {
            this.setState({
                data: res.recent
            });
        });
    }

    onPress = (id) => {
        this.push('DailyDetail', {id});
    };

    render() {
        const {data} = this.state;

        return (
            <SafeAreaView style={BaseStyle.container}>
                <ScrollView style={BaseStyle.content}
                            bounces={false}
                            scrollEnabled={true}
                            automaticallyAdjustContentInsets={false}
                            scrollEventThrottle={10}>
                    {
                        data.map((data, index) => {
                            return <NewsCcomponent key={data + index}
                                                   index={index}
                                                   url={data.thumbnail}
                                                   title={data.title}
                                                   onPress={this.onPress.bind(this, data.news_id)}/>
                        })
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({});
