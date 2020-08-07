import React, { Component, createContext } from "react";
import { auth, db } from "./firebase";


export const UserContext = createContext();
class UserProvider extends Component {
  state = {
    userDetails: {
      userUID: null,
      tasks: null,
    }
  };

  componentDidMount = async () => {
    await auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        db.collection("users").where("userUID", "==", userAuth.uid).onSnapshot(snapshot => {
          // console.log(snapshot.docs)
          const data = snapshot.docs.map(doc => {
            // console.log(doc.data());
            return doc.data()
          });
          // console.log(data)
          this.setState({ userDetails: data[0] });
        })
      } else {
        this.setState({
          userDetails: {
            userUID: null,
            tasks: null
          }
        })
      }
    }, error => console.log(error.message));
  }

  render() {
    return (
      <UserContext.Provider value={this.state.userDetails}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;