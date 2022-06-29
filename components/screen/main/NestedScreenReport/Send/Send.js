import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import Header from "../../Header/Header";

import Form from "../../../../../preview_template_1.html";

import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const HTML = `<!DOCTYPE html>
<meta name='viewport'
      content='width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.5,'>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        @font-face { font-family: 'Rubik'; src: url('fonts/rubik_regular.ttf');}
        @font-face { font-family: 'Roboto Mono'; src: url('fonts/roboto_mono_regular.ttf');}
        @font-face { font-family: 'Roboto'; src: url('fonts/roboto_regular.ttf');}
        @font-face { font-family: 'Rubik'; src: url('fonts/rubik_bold.ttf'); font-weight: bold;}
        @font-face { font-family: 'Roboto Mono'; src: url('fonts/roboto_mono_bold.ttf'); font-weight: bold;}
        @font-face { font-family: 'Roboto'; src: url('fonts/roboto_bold.ttf'); font-weight: bold;}
        * {
            box-sizing: border-box;
        }

        body, html {
            height: 100%;
            margin: 0;
            padding: 0;
        }

        body {
            position: relative;
            font-family: Roboto, sans-serif;
            font-size: 10px;
            line-height: 16px;
            height: 842px;
            width: 595px;
            margin-left: auto;
            margin-right: auto;
            padding: 20px 20px 30px 20px
        }

        img {
            max-width: 100%;
        }

        .header {
            border-bottom: 1px solid black;
            position: relative;
            margin-right: 15px;
            height: 94px;
            width:100%;
        }

        .header .title {
            font-weight: bold;
        }
        .header .number {
            font-size: 14px;
            font-weight: bold;
            font-family: Rubik, normal;
            line-height: 14px;
        }

        b {
            font-weight: bold;
            display: inline-block;
            width: 50px;
            font-family: Roboto, sans-serif;
        }

        .dates {
            display: table;
            vertical-align: middle;
            font-family: "Roboto Mono";
            position: absolute;
            bottom: 4px;
            width:100%;
        }

        #dueOnReceipt {
            width:100%;
        }

        .half_cell {
            display: table-cell;
            width: 50%;
        }

        .header .logo {
            width: 94px;
            height: 94px;
            overflow: hidden;
            position: absolute;
            top: 0;
            right: 0;
            padding: 8px;
        }

        .body {
            display: table;
            vertical-align: middle;
            width:100%;
            margin-top: 16px;
        }

        .body .direction {
            font-weight: bold;
        }

         h3 {
            font-size: 14px;
            font-family: Rubik, sans-serif;
            font-weight: bold;
            padding: 8px 0 4px;
            margin: 0;
        }

        .half_cell > table {
            width: 100%;
        }

        .table_details {
            border-collapse: collapse;
            border-spacing: 0;
        }

        .td_title {
            width: 20%;
            vertical-align:text-top;
            text-align: left;
            padding: 0;
        }

        .td_value {
            width: 80%;
        }

        .td_value > span {
            font-family: "Roboto Mono";
            white-space: pre-line;
        }

        td {
             line-height:12px;
        }

        .description {
            margin: 16px 0;
        }

        .description table {
            text-align: right;
            width: 100%;
            border-collapse: collapse;
        }

        .description table thead th {
            border-bottom: 1px solid black;
        }

        .description table td, .description table th {
            width: 80px;
        }

        .description table td:nth-child(1), .description table th:nth-child(1) {
            text-align: left;
            width: auto;
        }

        .description table td {
            padding-top: 8px;
            padding-bottom: 8px;
            font-family: "Roboto Mono";
        }

        .description table tr:nth-child(1) td {
            padding-top: 16px;
        }

        .details {
            display: table;
            vertical-align: middle;
            width:100%;
        }

        .details .info > div {
            font-family: "Roboto Mono";
        }

        .details span {
            display: inline-block;
            font-family: "Roboto Mono";
        }

        .info {
            display: table-cell;
            width: 50%;
            padding-top: 8px;
        }

        .info table{
            width: 100%;
        }

        .payments_container {
            display: table-cell;
            width: 50%;
            vertical-align: top;
            border-top: 1px solid black;
            padding-top: 8px;
        }

        .payment {
            width: 160px;
            margin: 0 0 0 auto;
        }

        .payment table {
            text-align: right;
            border-collapse: collapse;
            border-spacing: 0;
            margin: 8px 0 4px;
        }

        .details .payment table td, .details .payment table th {
            width: 80px;
            font-family: "Roboto Mono";
        }

        .details .payment table td:nth-child(1), .details .payment table th:nth-child(1) {
            font-family: inherit;
        }

        .details .payment .footer {
            font-weight: bold;
        }

        .additional {
            display: table;
            vertical-align: middle;
            width:100%;
            margin-top: 2em;
        }

        .note {
            display: table-cell;
            width: 50%;
            font-family: "Roboto Mono";
            vertical-align: top;
        }

        .signature {
            display: table-cell;
            width: 50%;
        }

        .signature img {
            width: auto;
            height: 80px;
            float:right;;
            margin: 10%;
        }

        .stripe {
            display: table;
            vertical-align: middle;
            margin-top: 2em;
        }

        .stripe_pay_now {
            display: table-cell
            font-family: "Roboto Mono";
            vertical-align: top;
        }

        .stripe_info {
            display: table-cell;
            font-family: "Roboto Mono";
            vertical-align: bottom;
        }

        .stripe_info img {
            display: block;
            margin-left: 8px;
        }

        .payment_instructions {
            white-space: pre-line;
            font-family: "Roboto Mono";
            line-height: 10px;
        }

        .images {
            width: 510px;
            margin-top: 16px;
            margin-left: auto;
            margin-right: auto;
        }

        .images > img {
            display: inline-block;
            margin: 2px;
        }

    </style>
</head>
<body>
<div class="header">
    <div class="title">
        {{reportTitle}}
    </div>
    <div class="dates">
        <div class="half_cell">
            <table class="table_details">
                <tr>
                    <td class="td_title"><b>Created</b></td>
                    <td class="td_value"><span>{{reportDate}}</span></td>
                </tr>
            </table>
        </div>
    </div>
</div>
<!--  Table of items  -->
<div class="description">
    <table>
        <thead>
        <tr>
            <th>Merchant</th>
            <th>Date</th>
            <th>Price</th>
            <th>Total</th>
        </tr>
        </thead>
        <tbody>
        {{#expenseRows}}
        <tr>
            <td>{{itemName}}</td>
            <td>{{itemDate}}</td>
            <td>{{itemPrice}}</td>
            <td>{{itemTotal}}</td>
        </tr>
        {{/expenseRows}}
        </tbody>
    </table>
</div>

<div class="details">
    <!--  Right block (subtotal, total)  -->
    <div class="payments_container">
        <div class="payment">
            <table>
                <thead>
                <tr>
                    {{#totalAmount}}
                    <th>Total</th>
                    <th>{{.}}</th>
                    {{/totalAmount}}
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
</body>
<div class="images">
    {{#photos}}
    <img src="data:image/png;base64,{{.}}"/>
    {{/photos}}
</div>
</html>`;

const Send = ({ navigation: { goBack } }) => {
  const routes = useRoute();

  return (
    <View style={styles.container}>
      <Header title={"Send"} screen={routes.name} goBack={goBack} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonsItem}>
          <MaterialIcons name="attach-email" size={30} color="#3cb371" />
          <Text style={styles.buttonsText}>Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonsItem}>
          <Entypo name="share" size={30} color="#3cb371" />
          <Text style={styles.buttonsText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonsItem}>
          <Feather name="printer" size={30} color="#3cb371" />
          <Text style={styles.buttonsText}>Print</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        {/* <WebView style={{ flex: 1 }} source={{ html: HTML }} /> */}
        {/* <WebView
          style={{ flex: 1 }}
          source={{
            uri: "file:///C:/Users/ser/Documents/GitHub/react%20native/myfinances/project/preview_template_1.html",
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        /> */}
        <WebView source={Form} scalesPageToFit />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    borderTopColor: "#a9a9a9",
    borderBottomColor: "#a9a9a9",
  },
  buttonsItem: {
    alignItems: "center",
  },
  buttonsText: {
    fontFamily: "RubikRegular",
    fontWeight: "400",
    fontSize: 18,
    color: "#3cb371",
  },
});

export default Send;