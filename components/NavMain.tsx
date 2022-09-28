import { Picker } from '@react-native-picker/picker'
import { CSSProperties, useState, useEffect } from 'react'
import { FC } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import * as sql from 'expo-sqlite';
import { uniqueId } from 'lodash';
import moment from 'moment';

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: '100%',
        backgroundColor: 'rgb(139, 255, 255)',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        padding: 5,
        // justifyContent: 'center',
        alignContent: 'flex-start',
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

const some: ViewStyle | CSSProperties = {}
const NavMain: FC = () => {
    const [selectedCategory, setSelectedCategory] = useState();
    const [taskList, setTaskList] = useState<any[]>([]);
    useEffect(()=>{
        const table = 'Tasks';
        const db = sql.openDatabase('trackit.db');
        db.transaction((tr) => {
            tr.executeSql(
                `
                    CREATE TABLE IF NOT EXISTS ${table} (
                        _id int,
                        taskLabel varchar(255),
                        dueTimestamp int,
                        category varchar(255),
                        desc varchar(255)
                    );
                `,
                undefined,
                (tr, res2) => {
                    console.log(res2)
                    tr.executeSql(
                        `
                            SELECT * FROM ${table}
                        `,
                        undefined,
                        (tr, res3) => {
                            setTaskList(res3.rows._array);
                        }
                    )
                },
                (tr, err) => {
                    console.log(err);
                    return false;
                }
            )
        });

        
        // (tr, res) => {
        //     console.log(res);
        //     tr.executeSql(
        //         `
        //             INSERT INTO ${table} (_id, taskLabel, dueTimestamp, category, desc)
        //             VALUES (${uniqueId()}, 'Test task', ${moment().add(1, 'days').unix()}, 'general', 'A test description about the test task.')
        //         `,
        //         undefined,
                
        //     )
        // }
    }, [])
    return (
        <View style={styles.container}>
            <Picker
                selectedValue={''}
                onValueChange={(itemValue, itemIndex) =>{}}
                style={{ width: '50%', height: 20, backgroundColor: 'white'}}
            >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>
            <View>
            {
                taskList.map((item: any)  => (
                    <View key={uniqueId()}>
                    <Text >
                        {item.taskLabel}
                    </Text>
                    </View>
                ))
            }
            </View>

            
        </View>
    )
}

export default NavMain
