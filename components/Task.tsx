import moment from "moment";
import { FC, useEffect } from "react"
import { StyleSheet, View, Text } from "react-native"
import { styles } from "../styles"

const instyle = StyleSheet.create({
    task: {
        
    }
})

interface TaskProps {
    id: number;
    label: string;
    dueTimestamp?: number;
    category: string;
    desc?: string;
    stage: string;
}
const Task: FC<TaskProps> = (props) => {
    return (
        <View style={[{flex: 1}, styles.bglight, styles.p3, styles.border, styles.shadow]}>
            <View style={[styles.dFlex]}>
                <Text style={[{fontSize: 20}]}>
                    {props.label}
                </Text>
                <Text style={[styles.mx2]}>{props.stage || '-'}</Text>
            </View>
            <View>
                <Text style={[{fontSize: 10}]}>
                    {props.desc}
                </Text>
            </View>
            <View style={[styles.dFlex]}>
                <Text style={[styles.msAuto]}>
                    {props.dueTimestamp? moment.unix(props.dueTimestamp).format('YYYY-MM-DD'): '-'}
                </Text>
            </View>
        </View>
        
    )
}

export default Task;