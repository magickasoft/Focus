import React, { Component } from 'react';
import  {
        StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    TouchableOpacity,
    Alert,
    NativeModules,
    Dimensions,
    Keyboard,
    Button,
} from 'react-native'
import _ from 'lodash'
import NavigationBar from 'react-native-navbar'
import BackButton from './IntroNav/BackButton'
import NavTitle from './IntroNav/NavTitle'

// import ClapitLoading from '../ClapitLoading'

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default class TestPage extends Component {
    constructor(props) {
        super(props);
        const { navigationPush, navigationPop, navigationReplace } = props;
        this.state = {
            email:'',
            password:'',
            confirmPassword:'',
            visibleHeight: Dimensions.get('window').height,
            keyboardOpen: false,
            signUp: props.signUp
        }
        // for time's sake, converting from navigator.push to navigationPush
        this.navigator = {
            push: (data, staticState = false) => {
                const { name, ...otherData } = data;
                const key = name + (staticState ? '' : ('-' + new Date().getTime()));
                navigationPush({ key, name, ...otherData })
            },
            pop: () => {
                navigationPop()
            },
            replace: (data, staticState = false) => {
                let { name, ...otherData } = data;
                const key = name + (staticState ? '' : ('-' + new Date().getTime()));
                navigationReplace({ key, ...otherData })
            }
        }
        this._keyboardWillShow = this._keyboardWillShow.bind(this)
        this._keyboardWillHide = this._keyboardWillHide.bind(this)

    }

    componentWillReceiveProps(newProps) {
        let { clapitAccountData:oldClapitAccountData } = this.props
        let { clapitAccountData, navigator, parentNavigator, signUp } = newProps
        this.setState({signUp});

        if (_.isEmpty(oldClapitAccountData) && !_.isEmpty(clapitAccountData)) { // logged in!
            let { isNew } = clapitAccountData

            // this.props.fetchProfileData(clapitAccountData.id)
            // this.props.fetchProfilePosts(clapitAccountData.id)

            if (isNew) {
                navigator.push({ name: 'EditProfileContainer'})
            } else {
                parentNavigator.pop()
            }
        }

    }

    componentDidMount() {
        Keyboard.addListener('keyboardWillShow', this._keyboardWillShow)
        Keyboard.addListener('keyboardWillHide', this._keyboardWillHide)
    }

    componentDidUpdate() {
        let { apiError, clapitAccountData, emailLoginError } = this.props

        if (apiError) {
            setTimeout(() => {  // give prev. modal time to close, otherwise this opens over video where use can't see it
                Alert.alert('Error', "We're sorry, please try your request again later.", [
                    { text: 'OK', onPress: () => this.props.clearApiError() }
                ])
            }, 500)
        }
    }

    _keyboardWillShow(e) {
        if (!this.refs.scrollView) {
            return;
        }
        let newVisibleHeight = Dimensions.get('window').height - e.endCoordinates.height;
        let { visibleHeight:oldVisibleHeight } = this.state
        this.setState({ visibleHeight: newVisibleHeight, keyboardOpen: true });

        // scrollTo -- not sure how to best handle but works for now
        if (Dimensions.get('window').height == 480) {
            this.refs.scrollView.scrollTo({ y: 350 })
        } else {
            this.refs.scrollView.scrollTo({ y: 250 })
        }
    }

    _keyboardWillHide(e) {
        if (!this.refs.scrollView) {
            return;
        }

        this.setState({ visibleHeight: Dimensions.get('window').height, keyboardOpen: false });

        this.refs.scrollView.scrollTo({ y: 0 })
    }

    _emailChange(evt) {
        let { text:email } = evt.nativeEvent
        this.setState({ email })
    }

    _passwordChange(evt) {
        let { text:password } = evt.nativeEvent
        this.setState({ password })
    }

    _confirmPasswordChange(evt) {
        let { text:confirmPassword } = evt.nativeEvent
        this.setState({ confirmPassword })
    }

    _onButtonPress(evt) {
        let { navigator, parentNavigator } = this.props

        let { emailLogin, emailSignup } = this.props
        if (this.state.signUp){
            if (!this.state.email || !this.state.password || !this.state.confirmPassword || this.state.password !== this.state.confirmPassword){
                return Alert.alert('Error', "All fields are required. Password must match.", [
                    { text: 'OK', onPress: () => {} }
                ])
            }
            if (!emailRegex.test(this.state.email)){
                Alert.alert('Error', "Must be valid e-mail address", [
                    { text: 'OK', onPress: () => {} }
                ])
                this.setState({email:''})
                return
            }
            emailSignup(this.state.email, this.state.password, () => {
                emailLogin(this.state.email, this.state.password, (err) => {
                    if (err) Alert.alert('Error', "We're sorry, please try to log in again.", [
                        { text: 'OK', onPress: () => {} }
                    ])
                }, true)
            })
        } else {
            if (!this.state.password || !this.state.email){
                return Alert.alert('Error', "Please fill both e-mail and password.", [
                    { text: 'OK', onPress: () => {} }
                ])
            }
            emailLogin(this.state.email, this.state.password,(err) => {
                if (err) Alert.alert('Error', "We're sorry, please try to log in again.", [
                    { text: 'OK', onPress: () => {} }
                ])
            })
        }
    }

    _renderEmailSignupLogin(signUp){
        let {
          email, password, confirmPassword
        } = this.state
        return(
          <View>
              <View style={styles.emailArea}>
                  <TextInput
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChange={this._emailChange.bind(this)}
                    style={styles.textInput}></TextInput>
                  <TextInput
                    placeholder="Password"
                    value={password}
                    secureTextEntry={true}
                    onChange={this._passwordChange.bind(this)}
                    style={styles.textInput}></TextInput>

              {(signUp)?  <TextInput
                    placeholder="Confirm password"
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChange={this._confirmPasswordChange.bind(this)}
                    style={styles.textInput}></TextInput>
               : null }
                  <TouchableOpacity onPress={this._onButtonPress.bind(this, signUp)} style={[styles.continueButton]}>
                      <View style={styles.buttonContent}>
                          <Text style={styles.buttonLabel}>{(signUp)? 'SIGN UP' : 'SIGN IN'}</Text>
                      </View>
                  </TouchableOpacity>
              </View>
          </View>
        )
    }
    renderUserFriends(user) {
        const userName = user.name ? <Text style={styles.header}>{user.name}</Text> : <Text style={styles.header}>{'None name user'}</Text> ;
        const userFriends = user.friends.map(user => (
            <View key={user.id} style={styles.touchableOpacity} >
                <Text style={styles.header}>{user.name}</Text>
            </View>));
        return (
            <View>
                { userName }
                { userFriends }
            </View>
        )
    }
    onPushPage (object) {

        this.navigator.push(object, true);
    }
    render() {
        let { signUp } = this.state
        let actionText = 'Sign in';
        let toggleText = 'SIGN UP';
        let questionText = 'Don\'t have an account? ';
        if (signUp) {
            actionText = 'Sign up'
            toggleText = 'SIGN IN'
            questionText = 'Already have an account? '
        }
        const { data } = this.props;
        console.log('~~~ data',data);
        return (
            <View style={styles.view}>
                <NavigationBar
                                statusBar={{tintColor: '#1f1b20', style: 'light-content'}}
                                leftButton={this._leftButton()}
                                title={this._title()}
                                style={styles.navBar}/>
                <View style={styles.bodyView}>
                    <ScrollView ref='scrollView' style={styles.scrollView} contentContainerStyle={{paddingBottom: 15}}>
                        <Button
                            onPress={this.onPushPage.bind(this,{ name: 'SubTestPageContainer', props: {uid: '559645cd1a38532d14349242'}})}
                            title="next query"
                            color="#841584"
                            accessibilityLabel="next query"
                        />
                        <View style={styles.upperView}>
                            { data ? data.loading ? <Text style={styles.header}>{'Loading'}</Text>
                                    :
                                    data.user ? this.renderUserFriends(data.user) : <Text style={styles.header}>{'None User'}</Text>
                                : <Text style={styles.header}>{'None data'}</Text>

                            }
                            {
                               // this._renderEmailSignupLogin.bind(this)(signUp)
                            }
                        </View>
                    </ScrollView>
                    {
                        // <ClapitLoading />
                    }
                </View>
            </View>
        )
    }

    _onPressToggle(){
        this.setState({signUp: !this.state.signUp});
    }

    _leftButton() {
        return (
            // <BackButton onPress={this._onPressBack.bind(this)}/>
            <BackButton text={'Back'} onPress={this._onPressBack.bind(this)} />
        )
    }

    _title() {
        let { signUp } = this.state
        let title = 'SIGN IN'
        if (signUp) {
            title = 'User Info'
        }

        return (
            <NavTitle>{title}</NavTitle>
        )
    }

    _onPressBack() {
        let { navigator, parentNavigator, parentPop } = this.props
        console.log('~~~~~~~Login', this.props);
        parentNavigator.pop();
        // navigator.pop()
        // if (parentPop){
        //     parentNavigator.pop()
        // }
    }

}

const styles = StyleSheet.create({
    header: { fontSize: 20, color:'#fff' },
    view: {
        flex: 1,
        //backgroundColor: 'white'
        backgroundColor: 'black',
    },
    navBar: {
        backgroundColor: '#1f1b20'
    },
    bodyView: {
        flex: 1
    },
    upperView: {
        flex: 0.75
    },
    descriptionView: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    lineView: {
        borderTopColor: '#8F8F8F',
        borderTopWidth: 1,
        flex: 0.3,
    },
    actionText: {
        //flex: 0.4,
        textAlign: 'center',
        fontSize: 16,
        color: '#7F7F7F'
    },
    socialNetworkViews: {
        height: 150,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    lowerView: {
        flexDirection: 'row'
    },
    lowerPadding: {
        flex: 0.18
    },
    lowerTextView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    lowerText: {
        flex: 0.64,
        fontSize: 16,
        textAlign: 'center',
        color: '#777'
    },
    lowerLinkText: {
        textDecorationLine: 'underline',
        textDecorationColor: 'gray'
    },
    emailArea: {
        height: 160,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 15,
        height:30,
        paddingLeft: 15,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    continueButton: {
        marginBottom: 10,
        borderRadius: 5,
        paddingRight: 20,
        backgroundColor: '#f0f0f0'
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginTop: 5,
        marginBottom: 5
    },
    buttonLabel: {
        color: '#B385FF',
        fontSize: 16,
        paddingLeft: 10
    },
    buttonView: {
        flex: 0.31,
        flexDirection: 'row',
        opacity: 0.8
    },
    buttonSignUp: {
        flex: 0.5,
        backgroundColor: '#777',
        opacity: 0.6
    },
    touchableOpacity: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionText: {
        color: '#CCC',
        textAlign: 'center',
        fontSize: 16,
        opacity:1
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        opacity:1
    }
})
