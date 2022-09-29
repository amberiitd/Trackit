import { FC } from "react";
import { Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as sql from 'expo-sqlite';
import { styles } from "../styles";

const DevScreen: FC = () => {
    const reloadTable = () => {
        const db = sql.openDatabase('trackit.db');
        db.transaction((tr) => {
            tr.executeSql(
                `
                    DROP TABLE Tasks;
                `,
                undefined,
                (tr, res) =>{
                    tr.executeSql(
                        `
                            CREATE TABLE IF NOT EXISTS Tasks (
                                _id int,
                                taskLabel varchar(255),
                                dueTimestamp int,
                                category varchar(255),
                                desc varchar(255),
                                stage varchar(255)
                            );
                        `,
                        undefined,
                        (tr, res) =>{
                            console.log('successfully reloaded')
                        }
                    )
                }
            )
        })
    }
    return (
        <ScrollView style={[{flex: 1}, styles.p2]}>
            <Button
                title="Reload task table"
                color="red"
                onPress={reloadTable}
            >
            </Button>
        </ScrollView>
    )
}

export default DevScreen;