
const csvchar = "^";

//var partefactArray = [];
//var pBenchmarksArray = [];
//var pBodyArray = [];
//var pDocumentBackground = [];
//var ppArray = [];
//var pSummaryArray = [];
//var zzz_btn1 = document.getElementById('myBtn1');
//var zzz_modal = document.getElementById('myModal');
//var zzz_span = document.getElementsByClassName('close')[0];
var ArrayDataTable = [];
var ArrayDataTableHeader = [];
var ArrayDataTablerow = [];
var pControlTableArray = [];
var pDataArray = [];
var pLogArray = [];
var pVulnerabilityArray = [];

function sQuote ( line ) {return ( '\'' + line + '\'' );}
function dQuote ( line ) {return ( "\"" + line + "\"" );}

function write_data_table_rows () {


  //sWIP += "<tr>";
  //iTotalCols = input.length;
  //for (idx = 0 ; idx < iTotalCols; idx++){
  //  sWIP += "<th>" + AutoTable[idx] + "</th>";
  //}
  //strWIP += "</tr>";

  //document.getElementById("vulnerability-table-rows").innerHTML = strWIP;

  strWIP = "";
  private_tables_create();
  private_tables_add_headers();
  private_tables_add_rows();

}

function private_tables_create () {
  // 0=table-index
  // 1=table-caption
  // 2=table-introduction-text
  // 3=table-summary-text

  //Create all of the user defined tables

  var sWIP = "";
  var sTableId = "";
  var sTableHeaderId = "";
  var sTableDataId = "";

  for (const AutoTable of ArrayDataTable) {
    //console.log(AutoTable);
    sTableId = AutoTable[0];
    sTableHeaderId = AutoTable[0] + "-h";
    sTableDataId = AutoTable[0] + "-d";
    sTableCaption = AutoTable[1] + " results";
    sIntro = AutoTable[2];
    sSummary = AutoTable[3];

    sWIP += "<div class='row'><div class='col m1'></div>";
    sWIP += "<div class='col m10'>";
    sWIP += html_h(2,"Section", AutoTable[1]);
    sWIP += html_p(sIntro);
    sWIP += "<table class='_width100'>";
    sWIP += "<thead id='" + sTableHeaderId + "'></thead>";
    sWIP += "<caption>" + sTableCaption + "</caption>";
    sWIP += "<tbody id='" + sTableDataId + "'></tbody>";
    sWIP += "</table>";
    sWIP += html_p(sSummary);
    sWIP += html_top();
    sWIP += "<hr>";
    sWIP += "</div>";
    sWIP += "</div>";
  }

  document.getElementById("data").innerHTML = sWIP;

}

function private_tables_add_headers () {
  //Add the table headers to each table
  var sTableId = "";
  var sTableHeaderId = "";
  var sTableDataId = "";
  var sWIP = "";

  for (const AutoHeader of ArrayDataTableHeader) {
    sWIP = "";
    //console.log(AutoHeader);
    sTableId = AutoHeader[0];
    sTableHeaderId = AutoHeader[0] + "-h";

    sWIP += "<tr>";
    iTotalCols = AutoHeader.length;

    for (idx = 1 ; idx < iTotalCols; idx++) {
      //sWIP += "<th>" + AutoHeader[idx] + "</th>";
      sWIP += html_th(AutoHeader[idx]);
    }

    sWIP += "</tr>";

    document.getElementById(sTableHeaderId).innerHTML = sWIP;
  }


}

function private_tables_add_rows () {
  //Add data rows to each table
  //var sTableId = "";
  //var sTableHeaderId = "";
  var sTableDataId = "";
  var sWIP = "";

  for (const AutoRow of ArrayDataTablerow) {
    //console.log(AutoRow);
    sTableDataId = AutoRow[0] + "-d";

    sWIP = "<tr>";
    iTotalCols = AutoRow.length;

    for (idx = 1 ; idx < iTotalCols; idx++) {
      sWIP += html_td(AutoRow[idx]);
    }

    sWIP += "</tr>";
    document.getElementById(sTableDataId).innerHTML += sWIP;
  }


}

function add_data_table() {
  // 0=table-index
  // 1=table-caption
  // 2=table-introduction-text
  // 3=table-summary-text

  var tArray = [];

  for (i = 0; i < arguments.length; i++) {
    tArray.push(arguments[i]);
  }

  ArrayDataTable.push(tArray);
}

function add_data_table_header() {
  var tArray = [];

  for (i = 0; i < arguments.length; i++) {
    tArray.push(arguments[i]);
  }

  ArrayDataTableHeader.push(tArray);
}

function add_data_table_row() {
  var tArray = [];

  for (i = 0; i < arguments.length; i++) {
    tArray.push(arguments[i]);
  }

  ArrayDataTablerow.push(tArray);
}

function add_data_row () {
  //pDataArray.push([sp1, sp2, sp3, sp4, sp5]);
  var tArray = [];

  for (let i = 0; i < arguments.length; i++) {
    tArray.push(arguments[i]);
  }

  pDataArray.push(tArray);
}

function add_control_row (parameter_name, parameter_value) {
  pControlTableArray.push([parameter_name, parameter_value]);
}

function set_document_title(parameter_value) {
  document.getElementById("document_title_1").innerHTML = parameter_value;
  document.getElementById("document_title_2").innerHTML = parameter_value;

  var x = document.getElementsByTagName("META");

  for (i = 0; i < x.length; i++) {
    if (x[i].name == "title") {
      x[i].content=parameter_value;
    }
  }

}

//function cat(parameter_name, parameter_value) {
//  partefactArray.push([parameter_name, parameter_value]);
//}

//function publish_artefact(parameter_name, parameter_value) {
//  partefactArray.push([parameter_name, parameter_value]);
//}

function publish_logtable_row(pdate, pseverity, pmessage) {
  pLogArray.push([pdate, pseverity, pmessage]);
}

function insert_control_table_basic() {
  //The template document body is empty by default
  //This function inserts the control table template
  //Application inserts publish_control_table_row()
  //Application commit phase executes write_control_table_rows()

  var template;
  template = ""
             + "<div class='row'> <div class='col m1'></div> <div class='col m10'> <div class='card _cream _round _width100'> <div class='-content'> <h4>Document Control Table</h4> </div> </div> </div> </div>"
             +"<div class='row'> <div class='col m1'></div> <div class='col m10'> <table class='_width100'> <thead> <tr> <th>Parameter Name</th> <th>Parameter Value</th></tr> </thead> <caption>Runtime Environment</caption> <tbody id='control-table-rows'> </tbody> </table> </div> </div>";
  document.getElementById("control-table").innerHTML = template;
  template = "";
}

function insert_document_log_table() {
  //The template document body is empty by default
  //This function inserts the log table template
  //Application inserts publish_log_table_row()
  //Application commit phase executes write_log_table_rows()


  var template;
  //template = "<div class='row'> <div class='col m1'></div> <div class='col m10 _cream'><h4>Logging</h4></div> </div> <div class='row'> <div class='col m1'></div> <div class='col m10'> <table class='_width100'> <thead> <tr> <th>Date</th> <th>Severity</th> <th>Message</th> </tr> </thead> <caption>Log Entries</caption> <tbody id='log-table-rows'> </tbody> </table> </div> </div><hr/>";
  template = ""
             + "<div class='row'> <div class='col m1'></div> <div class='col m10'> <div class='card _cream _round _width100'> <div class='-content'> <h4>Application Outcome Log</h4> </div> </div> </div> </div>"
             + "<div class='row'> <div class='col m1'></div> <div class='col m10'> <table class='_width100'> <thead> <tr> <th>Date</th> <th>Severity</th> <th>Message</th> </tr> </thead> <caption>Log Entries</caption> <tbody id='log-table-rows'> </tbody> </table> </div> </div><hr/>";
  document.getElementById("document-body").innerHTML = template;
  template = "";
}

function insert_document_vulnerability_table() {
  //The template document body is empty by default
  //This function inserts the log table template
  //Application inserts publish_log_table_row()
  //Application commit phase executes write_log_table_rows()


  var template;
  template = ""
             + "<div class='row'> <div class='col m1'></div> <div class='col m10'> <div class='card _cream _round _width100'> <div class='-content'> <h4>Vulnerability Report</h4> </div> </div> </div> </div>"
             + "<div class='row'> <div class='col m1'></div> <div class='col m10'> <table class='_width100'> <thead> <tr> <th>Date</th> <th>Severity</th> <th>Message</th> </tr> </thead> <caption>Vulnerabilities</caption> <tbody id='vulnerability-table-rows'> </tbody> </table> </div> </div><hr/>";
  document.getElementById("document-body").innerHTML = template;
  template = "";
}

function write_control_table_rows () {

  var idx = 0;
  var strWIP = "";

  var iTotalRows = pControlTableArray.length;
  var iTotalCols;

  for (const input of pControlTableArray) {
    //console.log(input);
    strWIP += "<tr>";
    iTotalCols = input.length;

    for (idx = 0 ; idx < iTotalCols; idx++) {
      strWIP += "<td>" + input[idx] + "</td>";
    }

    strWIP += "</tr>";
  }

  document.getElementById("control-table-rows").innerHTML = strWIP;

  strWIP = "";

}

function write_vulnerability_table_rows () {

  const pSKU = 0;
  const pScanResult = 1;
  const pSeverity = 2;
  const pResourceType = 3;
  const pRisk = 4;
  const pRemediation = 5;
  const pTargetList = 6;

  var idx;
  var strWIP;
  var stemp;

  var iTotalRows = pVulnerabilityArray.length;
  var iTotalCols = 7;

  strWIP = "";


  for (idx = 0; idx < iTotalRows; idx++) {
    strWIP = strWIP + "<tr>";

    switch(pVulnerabilityArray[idx][pSeverity]) {
    case "Low":
      sTrafficLight = "<span class='_f-indigo'>&#9724;</span>";
      break;

    case "Medium":
      sTrafficLight = "<span class='_f-warning'>&#9724;</span>";
      break;

    case "High":
      sTrafficLight = "<span class='_f-danger'>&#9724;</span>";
      break;

    default:
      sTrafficLight = "&#9726;";
    }

    sTrafficLight = sTrafficLight + "&nbsp;"

    for (jdx= 0 ; jdx < iTotalCols; jdx++) {

      switch (jdx) {
      case pSeverity:
        strWIP = strWIP + "<td>" + sTrafficLight + pVulnerabilityArray[idx][jdx] + "</td>";
        break;

      case pScanResult:
        if (pVulnerabilityArray[idx][jdx]=="Fail")
          strWIP = strWIP + "<td class='_f-danger'>" + pVulnerabilityArray[idx][jdx] + "</td>";
        else
          strWIP = strWIP + "<td>" + pVulnerabilityArray[idx][jdx] + "</td>";

        break;

      default:
        strWIP = strWIP + "<td>" + pVulnerabilityArray[idx][jdx] + "</td>";
      }
    }

    strWIP = strWIP + "</tr>";
  }

  document.getElementById("vulnerability-table-rows").innerHTML = strWIP;
  strWIP = "";

}

function write_data_table_rows2 () {

  var idx = 0;
  var strWIP = "";

  var iTotalRows = pDataArray.length;
  var iTotalCols;

  for (const input of pDataArray) {
    //console.log(input);
    strWIP += "<tr>";
    iTotalCols = input.length;

    for (idx = 0 ; idx < iTotalCols; idx++) {
      strWIP += "<td>" + input[idx] + "</td>";
    }

    strWIP += "</tr>";
  }

  document.getElementById("vulnerability-table-rows").innerHTML = strWIP;

  strWIP = "";

}

function write_log_table_rows () {

  const columnDate = 0;
  const columnSeverity = 1;
  const columnMessage = 2;

  var idx;
  var strWIP;

  strWIP = "";

  for (idx = 0; idx < pLogArray.length; idx++) {
    strWIP = strWIP
             + "<tr><td>"
             + pLogArray[idx][columnDate]
             + "</td><td>"
             + pLogArray[idx][columnSeverity]
             + "</td><td>"
             + pLogArray[idx][columnMessage]
             + "</td></tr>";
  }

  document.getElementById("log-table-rows").innerHTML = strWIP;
  strWIP = "";

}

//function write_artefacts () {
//  const parameterName = 0;
//  const parameterValue = 1;
//
//  var idx;
//  var strWIP;
//  var strpName;
//  var strpValue;
//
//  strWIP = "";
//
//  for (idx = 0; idx < partefactArray.length; idx++) {
//
//    strpName = partefactArray[idx][parameterName];
//    strpValue = partefactArray[idx][parameterValue];
//
//    switch( strpName ) {
//    case "h1":
//      strWIP = strWIP + html_h(1,strpValue);
//      break;
//
//    case "i":
//      strWIP = strWIP + html_image(strpValue);
//      break;
//
//    case "p":
//      strWIP = strWIP + html_p(strpValue);
//      break;
//
//    case "t":
//      strWIP = strWIP + html_bold_red(strpValue);
//      break;
//
//    default:
//      // code block
//    }
//
//  }
//
//  document.getElementById("TheDocument").innerHTML = strWIP;
//  strWIP = "";
//
//}

function html_image(str) {
  return  "<br><img src=" + sQuote(str) + " " + quote("style=width:500px;height:600px;") + "></img><br>"
}

function html_h(iLevel, sNormal, sSmall) {
  var sHLevel;
  var sMessage;
  sHLevel = "h" + iLevel.toString();
  sMessage = sNormal + " <small>" + sSmall + "</small>";
  sID = get_anchor_name(sMessage);
  sWIP = "<" + sHLevel + " id=" + sQuote(sID) + ">" + sMessage + "</" + sHLevel + ">";
  return sWIP;
}

  function get_anchor_name(sStr) {
    sWIP = "";
    sWIP = sStr.replace(/ /g,"_");
    sWIP = sWIP.replace(/</g,"");
    sWIP = sWIP.replace(/>/g,"");
    sWIP = sWIP.replace(/\//g,"");
    return sWIP;
  }

function html_th(str) {
  return  "<th scope='col'>" + str + "</th>";
}

function html_td(str) {
  return  "<td>" + str + "</td>";
}

function html_p(str) {
  return  "<p>" + str + "</p>";
}

function html_bold_red(str) {
  return "<b class='_f-danger'>" + str + "</b>";
}

function html_bold(str) {
  return "<b class='_f-danger'>" + str + "</b>";
}

function html_top() {
  return "<a href=" + sQuote("#top") + ">&#968; Home</a>";
}

//function zzz_get_sku_title(strSKU) {
//  //Grunt iteration over pBenchmarksArray to find the SKU title string.
//
//  const parameterSKU = 1;
//  const parameterTitle = 4;
//
//  var idx;
//  var strWIP;
//
//  strWIP = "SKU not found";
//
//  for (idx = 0; idx < pBenchmarksArray.length; idx++) {
//    if (pBenchmarksArray[idx][parameterSKU] === strSKU) {
//      strWIP = pBenchmarksArray[idx][parameterTitle];
//      break;
//    }
//  }
//
//
//  return strWIP
//}

function clean_up() {

  //partefactArray.length = 0;
  //pBenchmarksArray.length = 0;
  //pBodyArray.length = 0;
  pControlTableArray.length = 0;
  pDataArray.length = 0;
  //pDocumentBackground.length = 0;
  pLogArray.length = 0;
  //ppArray.length = 0;
  //pSummaryArray.length = 0;
  pVulnerabilityArray.length = 0;
  ArrayDataTable.length = 0;
  ArrayDataTableHeader.length = 0;
  ArrayDataTablerow.length = 0;
}


function add_menu() {
  var headings = [];
  var tag_names = { h1:1, h2:1, h3:1, h4:1, h5:1, h6:1 };

  function walk( root )  {
    if( root.nodeType === 1 && root.nodeName !== 'script' ) {
      if( tag_names.hasOwnProperty(root.nodeName.toLowerCase()) ) {
        headings.push( root );
      } else {
        for( var i = 0; i < root.childNodes.length; i++ ) {
          walk( root.childNodes[i] );
        }
      }
    }
  }

  function writemenu() {
    var anchor_name = "";
    var heading_title = "";
    var sWIP = "";

    sWIP += "<div id='Menu1'>";
    sWIP += "<ul class='topnav' id='myTopnav2'>";
    sWIP += "<li><a href='#beauter' class='brand'>Brand</a></li>";

    sWIP += "<li class='dropdown'>";
    sWIP += "<a href='#'>Navigator</a>";
    sWIP += "<div class='dropdown-content'>";

    sWIP += "<a href='javascript:void(0);' onclick='tableToCSV()'>Download Tables to CSV</a>";

    for( var i = 0; i < headings.length; i++ ) {
      //console.log(headings[i]);
      if (headings[i].nodeName == "H2" || headings[i].id == "document_control" ) {
        heading_title = headings[i].innerHTML.trim();
        anchor_name = headings[i].id;
        //console.log("x" + headings[i].nodeName + "x - " + heading_title + " ||| " + anchor_name);
      sWIP += "<a href='#" + anchor_name + "'>" + heading_title + "</a>";
      }
    }
    sWIP += "</div>";
    sWIP += "</li>";

    sWIP += "<li style='float:right;'>";
    sWIP += "<a href='#' >About</a>";
    sWIP += "</li>";
    sWIP += "<li class='-icon'><a href='javascript:void(0);' onclick='topnav('myTopnav2')'>xxx☰</a></li>";
    sWIP += "</ul>";
    sWIP += "</div>";

    document.getElementById('Menu1').innerHTML = sWIP;
  }

  walk( document.body );

  writemenu();

}

function tableToCSV() {
	var csv_data = [];
  var csvrow = [];

	var tables = document.getElementsByTagName('table');

	//console.log(tables);

	for (var t=0; t < tables.length; t++) {

		csv_data.push(tables[t].caption.innerText);

	  var rows = tables[t].querySelectorAll('tr');

    for (var r=0; r < rows.length; r++) {
		  csvrow.length = 0;
      var cols = rows[r].querySelectorAll('td,th');
  		for (var c = 0; c < cols.length; c++) {
  			csvrow.push(cols[c].innerHTML);
  		}
	    csv_data.push(csvrow.join(","));
    }
	  csv_data.push("");
	}
	csv_data = csv_data.join('\n');
	downloadCSVFile(csv_data);
}

function downloadCSVFile(csv_data) {
	CSVFile = new Blob([csv_data], {
		type: "text/csv"
	});
	// Create to temporary link to initiate download process
	var temp_link = document.createElement('a');

	// Download csv file
	temp_link.download = document.getElementById("document_title_1").innerHTML + ".csv";
	var url = window.URL.createObjectURL(CSVFile);
	temp_link.href = url;

	// This link should not be displayed
	temp_link.style.display = "none";
	document.body.appendChild(temp_link);

	// Automatically click the link to trigger download
	temp_link.click();
	document.body.removeChild(temp_link);
}
