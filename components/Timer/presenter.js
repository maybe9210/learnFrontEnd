import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Button from '../Button';

class Timer extends Component {
    componentWillReceiveProps(nextProps){
        const currentProps = this.props;
        if(!currentProps.isPlaying && nextProps.isPlaying){
            const timerInterval = setInterval( () => {
                currentProps.addSecond();
            }, 1000 );
            this.setState({
                interval: timerInterval
            });
        } else if (currentProps.isPlaying && !nextProps.isPlaying){
            clearInterval(this.state.interval);
        }
    }
    render() {
        const { 
            isPlaying, elapsedTime, timerDuration, 
            startTimer, restartTimer, addSecond,
        } = this.props;

        const time = timerDuration - elapsedTime;
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        const timeFormat = `${min > 10 ? min : `0${min}`}:${sec>10? sec : `0${sec}`}`;
        return (
            <View style={styles.container}>
                <StatusBar barStyle={"light-content"} />
                <View style={styles.upper}>
                    <Text style={styles.time}> {timeFormat} </Text>
                </View>
                <View style={styles.lower}>
                    {!isPlaying && <Button iconName="play-circle" onPress={startTimer} />}
                    {isPlaying && <Button iconName="stop-circle" onPress={restartTimer} />}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#CE0B24",
    },
    upper: {
        flex:2,
        justifyContent: "center",
        alignItems: "center",
    },
    lower: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },
    time: {
        color: "white",
        fontSize: 120,
        fontWeight: "100"
    }
})

export default Timer;