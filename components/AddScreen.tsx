import { FC, useCallback, useRef, useState } from "react"
import { TextInput, View, Text, Button } from "react-native"
import { styles } from "../styles";
import DateTimePickerAndroid from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'
import moment from "moment";
import { isEmpty, startCase, uniqueId } from "lodash";

const AddScreen: FC<{navigation: any}> = ({navigation} ) => {
    const [form, setForm] = useState<{
        label: string;
        dueby?: number;
        category: string;
        desc: string;
    }>({
        label: '',
        category: 'general',
        dueby: moment().unix(),
        desc: ""
    });
    const [showdatetime, setShowdatetime] = useState(false);

    const getNewTask = useCallback(() => {
        if (!isEmpty(form.label)){
            return form;
        }
        return undefined;
    }, [form])
    return (
        <View style={[{flex: 1, backgroundColor: 'azure'}, styles.px2]}>
            <View style={[styles.py2]}>
                <Text>
                    What is to be done?
                </Text>
                <TextInput
                    style={[{height: 40}, styles.bgWhite, styles.px2, styles.border, styles.rounded]}
                    placeholder="Give your task a name"
                    onChangeText={newText => setForm({...form, label: newText})}
                    value={form.label}
                />
            </View>

            <View style={[styles.py2]}>
                <Text>
                    Date
                </Text>
                <TextInput
                    style={[{height: 40}, styles.bgWhite, styles.px2, styles.border, styles.rounded]}
                    placeholder="Select a date"
                    onTouchEnd={() => {setShowdatetime(true)}}
                    value={form.dueby? (new Date(form.dueby* 1000)).toDateString(): ""}
                />
                {
                    showdatetime && 
                    <DateTimePickerAndroid 
                        mode="date" 
                        value={new Date((form.dueby || moment().unix()) *1000)} 
                        onChange={(e: any, date: Date | undefined) => {
                            setForm({...form, dueby: moment(date).unix()});
                            console.log(moment(date).unix());
                            setShowdatetime(false);
                        }}
                        
                    />
                        
                }
            </View>

            <View style={[styles.py2]}>
                <Text>
                    Add to List
                </Text>
                <Picker
                    selectedValue={form.category}
                    onValueChange={(itemValue, itemIndex) => { setForm({...form, category: itemValue}) }}
                    style={[styles.bgWhite, styles.px2, styles.border, styles.rounded]}
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
            </View>

            <View style={[styles.py2]}>
                <Text>
                    Description
                </Text>
                <TextInput 
                    style={[ styles.bgWhite, styles.px2, styles.border, styles.rounded]}
                    placeholder="Write a brief descption."
                    value={form.desc}
                    onChangeText={(text) => {setForm({...form, desc: text})}}
                    multiline={true}
                    numberOfLines={5}
                />
            </View>

            <View style={[styles.positionAbsolute, {right: 40, bottom: 40}]}>
                <View style={[{width: 70}]}>
                    <Button
                        title="Ok"
                        onPress={()=>{navigation.navigate('Home', { task: getNewTask()})}}
                        color="rgb(10, 204, 204)"
                    ></Button>
                </View>
            </View>
        </View>
    )
}

export default AddScreen;