import { FC, useCallback, useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import * as sql from 'expo-sqlite';
import { isEmpty, uniqueId } from 'lodash';
import moment from 'moment';
import Task from './Task';
import NavMain from "./NavMain";
import { styles } from "../styles";
import CustomSwipeableRow from "./util/CustomSwipeableRow";
import TabHeader from "./util/TabHeader";

const HomeScreen: FC<any> = (props) =>{
    const table = 'Tasks';
    const [taskList, setTaskList] = useState<any[]>([]);
    const [selectedTab, setSelectedTab] = useState('todo');
    const [selectedCategory, setSelectedCategory] = useState('work');
    const tabs = [
        {
            label: 'Todo',
            value: 'todo'
        },
        {
            label: 'In Progress',
            value: 'inprogress'
        },
        {
            label: 'Done',
            value: 'done'
        },
        {
            label: 'All',
            value: 'all'
        }
    ];

    useEffect(() => {
        const db = sql.openDatabase('trackit.db');
        db.transaction((tr) => {
            tr.executeSql(
                `
                    CREATE TABLE IF NOT EXISTS ${table} (
                        _id int,
                        taskLabel varchar(255),
                        dueTimestamp int,
                        category varchar(255),
                        desc varchar(255),
                        stage varchar(255)
                    );
                `,
                undefined,
                (tr, res2) => {
                    reloadTasksByCategory(selectedCategory)
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

    useEffect(() => {
        const task = props.route.params?.task;
        if (isEmpty(task)){
            return;
        }
        props.route.params.task = undefined;
        const db = sql.openDatabase('trackit.db');
        db.transaction((tr) => {
            tr.executeSql(
                `
                    INSERT INTO ${table} (_id, taskLabel, dueTimestamp, category, desc, stage)
                    VALUES (${uniqueId()}, '${task.label}', '${task.dueby}', '${task.category}', '${task.desc}', 'todo')
                `,
                undefined,
                (tr, res)=> {
                    setTaskList([
                        ...taskList, 
                        {
                            _id: parseInt(uniqueId()),
                            taskLabel: task.label,
                            dueTimestamp: task.dueby,
                            category: task.category,
                            desc: task.desc,
                            stage: 'todo'
                        }
                    ])
                },
                (tr, err) => {
                    console.log(err)
                    return false;
                }
            )
        })
    }, [props])

    const deleteTask = useCallback((id: any) => {
        const db = sql.openDatabase('trackit.db');
        db.transaction((tr) => {
            tr.executeSql(
                `
                    DELETE FROM ${table}
                    WHERE _id = ${id}
                `,
                undefined,
                (tr, res)=> {
                    setTaskList(taskList.filter(item => item._id !== id))
                },
                (tr, err) => {
                    console.log(err)
                    return false;
                }
            )
        })
    }, [taskList]);

    const updateTaskStage = useCallback((id: any, stage: string) => {
        const db = sql.openDatabase('trackit.db');
        db.transaction((tr) => {
            tr.executeSql(
                `
                    UPDATE ${table}
                    SET stage = '${stage}'
                    WHERE _id = ${id};
                `,
                undefined,
                (tr, res)=> {
                    const index = taskList.findIndex(item => item._id === id)
                    const task = {...taskList[index], stage}
                    setTaskList([...taskList.slice(0, index), task, ...taskList.slice(index+1 )])
                },
                (tr, err) => {
                    console.log(err)
                    return false;
                }
            )
        })
    }, [taskList]);

    const reloadTasksByCategory = (category: string) => {
        const db = sql.openDatabase('trackit.db');
        db.transaction((tr) => {
            tr.executeSql(
                `
                    SELECT * FROM ${table}
                    WHERE category = '${category}';
                `,
                undefined,
                (tr, res)=> {
                    setTaskList(res.rows._array);
                },
                (tr, err) => {
                    console.log(err)
                    return false;
                }
            )
        })
    }

    useEffect(()=>{
        reloadTasksByCategory(selectedCategory);
    }, [selectedCategory])

    return (
        <View style={[{flex: 1, backgroundColor: 'azure', }]}>
            <View style={{}}>
                <NavMain navigation={props.navigation}
                    selectedCategory={selectedCategory}
                    selectCategoryHandler={(value: string) => {
                        setSelectedCategory(value)
                    }}
                />
            </View>
            <View style={[styles.mt2]}>
                <TabHeader 
                    items={tabs}
                    selectHandler={(val) => {
                        setSelectedTab(val)
                    }}
                    selectedItemValue={selectedTab}
                />
            </View>
            <ScrollView style={[styles.py2 ]}>
                {
                    taskList.filter(task => selectedTab === 'all' || task.stage === selectedTab).map((item: any) => (
                        <CustomSwipeableRow 
                            key={uniqueId()}
                            deleteHandler={deleteTask}
                            updateStageHandler={updateTaskStage}
                            itemId={item._id}
                        >
                            <Task
                                id={item._id} 
                                label={item.taskLabel} 
                                category={item.category} 
                                dueTimestamp={item.dueTimestamp}
                                desc={item.desc}
                                stage={item.stage}
                            />
                        </CustomSwipeableRow>
                    ))
                }
            </ScrollView>
            <View style={[styles.positionAbsolute, {right: 40, bottom: 40}]}>
                <View style={[{width: 70}]}>
                    <Button
                        title="Add"
                        onPress={()=>{props.navigation.navigate('AddNew', { })}}
                        color="rgb(10, 204, 204)"
                    ></Button>
                </View>
            </View>
        </View>
    )
}

export default HomeScreen;