import React, { useState, useEffect } from 'react';
import {View, 
        StyleSheet, 
        Modal, 
        Text, 
        StatusBar, 
        TextInput, 
        TouchableWithoutFeedback,
        Keyboard} from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';

const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {

    const [title, setTitle] = useState ('');
    const [desc, setDesc] = useState ('');

    const handleModalClose = () => {
            Keyboard.dismiss();
    };

    useEffect(() => {
        if(isEdit) {
            setTitle(note.title)
            setDesc(note.desc)
        }
    }, [isEdit]);

    const handleOnChangeText = (text, valueFor) => {
        if (valueFor === 'title') setTitle(text);
        if (valueFor === 'desc') setDesc(text);
    };

    const handleSubmit = () => {
        if (!title.trim() && !desc.trim()) return onClose();
            
        if (isEdit){
            onSubmit(title, desc, Date.now());
        }else{
        onSubmit(title, desc);
        setTitle('');
        setDesc('');
        }        
        onClose();
    };

    const closeModal = () => {
        if(!isEdit){
            setTitle('');
            setDesc('');

        }
        onClose();
    };

    return (
        <>
        <StatusBar hidden />
        <Modal visible = {visible} animationType='fade'>
            <View style={styles.container}>
            <TextInput  value={title}
                        placeholder='Title'
                        style={[styles.input, styles.title]}
                        onChangeText={(text) => handleOnChangeText(text,'title')}/>
            <TextInput  multiline
                        value={desc} 
                        placeholder='Note' 
                        style={[styles.input, styles.desc]}
                        onChangeText={(text) => handleOnChangeText(text,'desc')}/>
                    <View style={styles.btnContainer}>
                    <RoundIconBtn   antIconName={'check'}
                                    onPress={handleSubmit} />

                    { title.trim() || desc.trim() ? (<RoundIconBtn   
                                    style={{marginLeft:15}}
                                    antIconName='close'
                                    onPress={closeModal} 
                                    /> )
                                    : null }
                    </View>
            </View>
            <TouchableWithoutFeedback onPress={handleModalClose}>
                <View style={[styles.modalBG, StyleSheet.absoluteFillObject]}/>
            </TouchableWithoutFeedback>
        </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop:25
    },
    input : {
        borderBottomWidth: 2,
        borderBottomColor: colors.PRIMARY,
        fontSize: 20,
        colors: colors.DARK
    },
    title: {
        height:40,
        marginBottom: 15,
        fontWeight:'bold '
    },
    desc :{
        height: 100, 
    },
    modalBG:{
        flex: 1,
        zIndex: -1
    },
    btnContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 20

    }

});

export default NoteInputModal;
