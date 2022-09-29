import { uniqueId } from "lodash";
import { FC } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native";
import { styles } from "../../styles";

interface TabHeaderProps{
    items: {
        label: string;
        value: string;
    }[];
    selectedItemValue: string;
    selectHandler: (value: string) => void;
}

const TabHeader: FC<TabHeaderProps> = (props) =>{

    return(
        <ScrollView horizontal={true} style={[ styles.dFlex, styles.px2]}>
            {
                props.items.map(item => (
                    <TouchableHighlight
                        key={uniqueId()}
                        onPress={()=> {props.selectHandler(item.value)}}
                        underlayColor='whitesmoke'
                    >
                        <View 
                            
                            // onTouchEnd={() => {
                                
                            // }}
                            style={[styles.px3, styles.pt3, {marginLeft: 1}]}
                        >
                            <Text>
                                {item.label}
                            </Text>
                            {props.selectedItemValue === item.value && 
                            <View style={[instyle.bottomPad, styles.mt3]}></View>}
                        </View>
                    </TouchableHighlight>  
                ))
            }
        </ScrollView>
    )
}
const instyle = StyleSheet.create({
    bottomPad:{
        padding: 2, 
        backgroundColor: 'rgb(10, 204, 204)', 
        borderTopStartRadius: 3,
        borderTopEndRadius: 3,
    }
})
export default TabHeader;