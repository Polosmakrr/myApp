import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";

const Alert = ({ showAlert, setShowAlert, onClose }) => {
  return (
    <AwesomeAlert
      show={showAlert}
      showProgress={false}
      title=""
      message="Are you sure you want to discard changes?"
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}
      confirmText="Discard"
      cancelText="Keep editing"
      confirmButtonColor="#DD6B55"
      contentContainerStyle={{
        backgroundColor: "#696969",
      }}
      messageStyle={{
        color: "#d3d3d3",
        fontFamily: "RubikBold",
        fontWeight: "800",
        fontSize: 18,
      }}
      cancelButtonStyle={{ backgroundColor: "transparent" }}
      confirmButtonStyle={{ backgroundColor: "transparent" }}
      cancelButtonTextStyle={{
        color: "#3cb371",
        fontFamily: "RubikBold",
        fontWeight: "800",
        fontSize: 18,
      }}
      confirmButtonTextStyle={{
        color: "#3cb371",
        fontFamily: "RubikBold",
        fontWeight: "800",
        fontSize: 18,
      }}
      onCancelPressed={() => {
        setShowAlert(false);
      }}
      onConfirmPressed={() => {
        onClose();
      }}
    />
  );
};

export default Alert;
