import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AlbumContext } from '../context/AlbumContext'
import { useNavigation } from '@react-navigation/native'

const AddAlbum = () => {
    const [name, setName] = useState('')
    const now = Date.now()
    const { addAlbum } = useContext(AlbumContext)
    const navigation = useNavigation()

    return (
        <View>
            <Text style={styles.title}>Album name:</Text>
            <TextInput onChangeText={setName} value={name} style={styles.input} placeholder="Enter Album name..." placeholderTextColor='#555' />
            <TouchableOpacity onPress={() => {
                addAlbum({ name, date: now })
                navigation.goBack()
            }}
                disabled={name === ''}
                style={styles.buttonContainer}>
                <Text style={{ color: '#fff', textAlign: "center", padding: 20 }}>Add Album</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddAlbum

const styles = StyleSheet.create({
    input: {
        padding: 10,
        backgroundColor: '#ddd',
        marginVertical: 20,
        marginHorizontal: 10
    },
    title: {
        fontSize: 20,
        margin: 10
    },
    buttonContainer: { backgroundColor: 'green', marginVertical: 20, marginHorizontal: 10 }
})