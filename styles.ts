import { StyleSheet } from "react-native";

const twopx = 5;
const threepx= 10;

export const styles = StyleSheet.create({
    dFlex: {
        flexDirection: "row",
    },
    flexNoWrap: {
        flexWrap: 'nowrap'
    },
    justifyContentCenter: {
        justifyContent: "center"
    },
    msAuto: {
        marginStart: 'auto'
    },
    shadow: {
        elevation: 2
    },
    p2: {
        padding: twopx
    },
    pt2: {
        paddingTop: twopx
    },
    pt3: {
        paddingTop: threepx
    },
    ps3:{
        paddingStart: threepx
    },
    mb2:{
        marginBottom: twopx
    },
    positionRelative: {
        position: "relative"
    },
    positionAbsolute: {
        position: 'absolute'
    },
    btnCircle:{
        height: 70,
        width: 70,
        borderWidth: 1,
        borderRadius: 35,
        overflow: "hidden"
    },
    bgWhite: {
        backgroundColor: 'white'
    },
    bglight: {
        backgroundColor: 'whitesmoke'
    },
    px2: {
        paddingStart: twopx,
        paddingEnd: twopx,
    },
    py2: {
        paddingTop: twopx,
        paddingBottom: twopx,
    },
    border: {
        borderWidth: 1,
        borderColor: 'rgb(237, 237, 237)'
    },
    rounded: {
        borderRadius: 5
    },
    p3: {
        padding: threepx
    },
    overflowScroll: {
        overflow: 'scroll'
    },
    my2:{
        marginTop: twopx,
        marginBottom: twopx
    },
    my3:{
        marginTop: threepx,
        marginBottom: threepx
    },
    mx2:{
        marginStart: twopx,
        marginEnd: twopx
    },
    mx3:{
        marginStart: threepx,
        marginEnd: threepx
    },
    px3:{
        paddingStart: threepx,
        paddingEnd: threepx
    },
    border2:{
        borderWidth: twopx
    },
    borderThm:{
        borderColor: 'red'
    },
    mt2:{
        marginTop: twopx
    },
    mt3:{
        marginTop: threepx
    }
});

export const appstyles = StyleSheet.create({
    nav: {
        backgroundColor: "rgb(10, 204, 204)"
    }
})