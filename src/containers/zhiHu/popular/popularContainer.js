import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import BaseComponent from '../../baseComponent';
import BaseStyle from "../../../lib/baseStyle";
import Http from '../../../lib/http';
import  {URLS} from '../../../lib/urls';
import NewsCcomponent from '../newsCcomponent';


export default class PopularContainer extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            data: [1, 2, 3, 4],
        };
    }

    componentDidMount() {
        console.log('hot', Http.get(URLS.hot));
        /*Http.get(URLS.hot).then((response) => {
         console.log('componentDidMount', response);
         this.setState({data: response.recent});
         });*/
    }

    onPress = () => {

    };

    render() {

        const {data} = this.state;

        return (
            <SafeAreaView style={BaseStyle.container}>
                <View style={BaseStyle.content}>

                    {
                        data.map((data, index) => {
                            return <NewsCcomponent key={index}
                                                   url={'https://pic4.zhimg.com/v2-e70647e35eb09ce571546426727aa2df.jpg'}
                                                   title={'瞎扯：如何正确地吐槽瞎扯：如何正确地吐槽瞎扯：如何正确地吐槽瞎扯：如何正确地吐槽'}
                                                   onPress={this.onPress}/>
                        })
                    }

                </View>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({});
