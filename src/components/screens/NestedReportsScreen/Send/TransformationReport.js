import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import {WebView} from 'react-native-webview';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import Share from 'react-native-share';
import Mailer from 'react-native-mail';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

const TransformationReport = ({report: {report}}) => {
  const print = async () => {
    await RNPrint.print({
      html: ReportHTML,
    });
  };

  const share = async () => {
    const results = await RNHTMLtoPDF.convert({
      html: ReportHTML,
      fileName: 'report',
      base64: true,
    });
    await Share.open({url: `file://${results.filePath}`});
  };

  const send = async () => {
    const results = await RNHTMLtoPDF.convert({
      html: ReportHTML,
      fileName: 'report',
      base64: true,
    });
    Mailer.mail(
      {
        isHTML: true,
        attachments: [
          {
            path: results.filePath,
            type: 'pdf',
          },
        ],
      },
      error => console.log(error),
    );
  };

  const renderLoadingViev = () => (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size={50} color={'#3cb371'} />
    </View>
  );

  const titleReport = `<h3> ${report.title}</h3>`;

  const reportDate = `${report.date}`;

  const expenseRows = report.item.map(item => {
    return `<tr>
            <td>${item.title}</td>
            <td>${item.date}</td>
            <td>${item.total} ${
      item.currency.currency.symbol ? item.currency.currency.symbol : ''
    }</td>
            <td>${item.total} ${
      item.currency.currency.symbol ? item.currency.currency.symbol : ''
    }</td>
        </tr>`;
  });

  const totalAmount = `<th>Total</th>
                    <th>${report.total.toFixed(2)} $</th>`;
  const ReportHTML = `<!DOCTYPE html>
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

        body {
            font-family: Roboto, sans-serif;
            font-size: 10px;
            line-height: 16px;
            max-height: 842px;
            max-width: 595px;
            margin-left: auto;
            margin-right: auto;
            padding: 20px 20px 30px 20px
        }

         h3 {
            font-size: 14px;
            font-family: Rubik, sans-serif;
            font-weight: bold;
            padding: 8px 0 4px;
            margin: 0;
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

        .dates {
            display: table;
            vertical-align: middle;
            font-family: "Roboto Mono";
            position: absolute;
            bottom: 4px;
            width:100%;
        }

        .half_cell {
            display: table-cell;
            width: 50%;
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

    </style>
</head>
<body>
<div class="header">
    <div class="title">
        ${titleReport}
    </div>
    <div class="dates">
        <div class="half_cell">
            <table class="table_details">
                <tr>
                    <td class="td_title"><b>Created</b></td>
                    <td class="td_value"><span>${reportDate}</span></td>
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
        ${expenseRows}
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
                    ${totalAmount} 
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
</body>
</html>`;

  return (
    <View style={{flex: 1}}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonsItem} onPress={() => send()}>
          <MaterialIcons name="attach-email" size={30} color="#3cb371" />
          <Text style={styles.buttonsText}>Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonsItem} onPress={() => share()}>
          <Entypo name="share" size={30} color="#3cb371" />
          <Text style={styles.buttonsText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonsItem} onPress={() => print()}>
          <Feather name="printer" size={30} color="#3cb371" />
          <Text style={styles.buttonsText}>Print</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}>
        <WebView
          style={styles.html}
          source={{
            html: ReportHTML,
          }}
          originWhitelist={['*']}
          startInLoadingState
          renderLoading={renderLoadingViev}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    borderTopColor: '#a9a9a9',
    borderBottomColor: '#a9a9a9',
  },
  buttonsItem: {
    alignItems: 'center',
  },
  buttonsText: {
    fontFamily: 'RubikRegular',
    fontWeight: '400',
    fontSize: 14,
    paddingTop: 4,
    color: '#3cb371',
  },
  html: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
export default TransformationReport;
