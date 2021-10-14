import React from "react";
import styles from '../../styles/';
import { DrawerActions } from 'react-navigation-drawer';
import { 
    Right, Button, Left, 
    Icon, Body, Title, Header
} from "native-base";
import { Appbar } from 'react-native-paper';

export default class HeaderComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    openDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer()); 
    };

    componentDidMount() {

    }
    
    render() {

        return (
            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="menu" onPress={this.openDrawer} />
                <Appbar.Content
                    title={this.props.title}
                />
            </Appbar.Header>
        );
    }
}