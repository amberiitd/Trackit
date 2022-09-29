import { Picker } from '@react-native-picker/picker'
import { startCase, uniqueId } from 'lodash';
import { CSSProperties, useState, useEffect } from 'react'
import { FC } from 'react';
import { Button, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { styles } from '../styles';


const instyles = StyleSheet.create({
    container: {
        height: 100,
        width: '100%',
        backgroundColor: 'rgb(10, 204, 204)',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        padding: 5,
        alignContent: 'flex-end',
        // boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        // // borderWidth: 1,
        // borderColor: '',
        // shadowColor: 'rgba(0, 0, 0, 0.2)',
        // elevation: 2

    },
    flushEnd: {
        marginStart: 'auto',
    },
});

interface NavMainProps{
    selectCategoryHandler: (value: string) => void;
    selectedCategory: string;
    navigation: any;
}

const some: ViewStyle | CSSProperties = {}
const NavMain: FC<NavMainProps> = (props) => {
    return (
        <View style={instyles.container}>
            <Picker
                selectedValue={props.selectedCategory}
                onValueChange={(itemValue: any, itemIndex) => {
                     props.selectCategoryHandler(itemValue) 
                }}
                style={{ width: '50%', height: 20, backgroundColor: 'white', marginTop: 'auto',}}
            >
                {
                    ['general', 'work', 'family'].map(cat => (
                        <Picker.Item key={uniqueId()} 
                            label={startCase(cat)}
                            value={cat}
                        />
                    ))
                }
            </Picker>
            {/* <View style={[styles.msAuto, {marginTop: 'auto'}]}>
                <Button
                    title='Dev'
                    color='red'
                    onPress={()=>{props.navigation.navigate('Dev', {})}}
                    
                >
                </Button>
            </View> */}
            
        </View>
    )
}

export default NavMain
