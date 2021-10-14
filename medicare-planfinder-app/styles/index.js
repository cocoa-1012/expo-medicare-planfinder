import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    header: {
        backgroundColor: '#0ea2e2'
    },
    sidebarBody: {
        backgroundColor: '#0ea2e2',
        flex: 1,
    },
    drawerImage: {
        backgroundColor: '#0ea2e2',
        justifyContent: 'center',
        textAlign: 'center',
        flex: 1,
        padding: 25,
        paddingTop: 70
    },
    mainImage: {
        alignSelf: 'center'
    },
    gif: {
        alignContent: 'center',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        justifyContent: 'center'
    },
    sidebarListItem: {
        marginTop: 10,
        alignContent: 'center',
        fontWeight: 'bold'
    }
});