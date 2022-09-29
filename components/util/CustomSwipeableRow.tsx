import { FC, useCallback, useRef } from "react";
import { GestureHandlerRootView, RectButton, Swipeable } from "react-native-gesture-handler";
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from "../../styles";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

interface CustomSwipeableRowProps{
    deleteHandler: (id: any) => void;
    updateStageHandler: (id: any, stageId: string) => void;
    itemId: any;
}
const CustomSwipeableRow: FC<React.PropsWithChildren<CustomSwipeableRowProps>> = (props) => {
    const ref = useRef<Swipeable>(null);
    const closeHandler = useCallback(() => {ref.current?.close();}, [ref]);
    const renderLeftActions = (progress: any, dragX: any) => {
        const scale = dragX.interpolate({
            inputRange: [0, 80],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        
        return (
            <View style={[instyles.leftAction]}>
                <RectButton style={instyles.todo} onPress={()=>{
                    props.updateStageHandler(props.itemId, 'todo');
                    closeHandler();
                }}>
                    <AnimatedIcon
                        name="lock-clock"
                        size={30}
                        color="#fff"
                        style={[instyles.actionIcon]}
                    />
                </RectButton>
                <RectButton style={instyles.inprogress} onPress={()=>{
                    props.updateStageHandler(props.itemId, 'inprogress');
                    closeHandler();
                }}>
                    <AnimatedIcon
                        name="done"
                        size={30}
                        color="#fff"
                        style={[instyles.actionIcon]}
                    />
                </RectButton>
                <RectButton style={instyles.done} onPress={()=>{
                    props.updateStageHandler(props.itemId, 'done');
                    closeHandler();
                }}>
                    <AnimatedIcon
                        name="done-all"
                        size={30}
                        color="#fff"
                        style={[instyles.actionIcon]}
                    />
                </RectButton>
            </View>
            
        );
    };
    const renderRightActions = (progress: any, dragX: any) => {
        const scale = dragX.interpolate({
            inputRange: [-80, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        return (
            <RectButton style={instyles.rightAction} onPress={() =>{
                props.deleteHandler(props.itemId);
                closeHandler();
            }}>
                <AnimatedIcon
                    name="delete-forever"
                    size={30}
                    color="#fff"
                    style={[instyles.actionIcon]}
                />
            </RectButton>
        );
    }
    return (
        <GestureHandlerRootView>
            <Swipeable
                ref={ref}
                friction={2}
                leftThreshold={80}
                rightThreshold={80}
                renderLeftActions={renderLeftActions}
                renderRightActions={renderRightActions}
            >
                {props.children}
            </Swipeable>
        </GestureHandlerRootView>
    )
}

const instyles = StyleSheet.create({
    leftAction: {
        width: '50%',
        alignItems: 'center',
        flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse'
    },
    actionIcon: {
        width: 30,
        marginHorizontal: 10
    },
    rightAction: {
        alignItems: 'center',
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        backgroundColor: '#dd2c00',
        width: '50%',
        justifyContent: 'flex-end'
    },
    todo: {
        flex: 1,
        height: '100%',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    inprogress: {
        flex: 1,
        height: '100%',
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    done: {
        flex: 1,
        height: '100%',
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
});  

export default CustomSwipeableRow;