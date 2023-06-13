
  const csvchar = "^";

	var zzz_modal = document.getElementById('myModal');
	var zzz_btn1 = document.getElementById('myBtn1');
	var zzz_span = document.getElementsByClassName('close')[0];
	var ppArray = [];
	var pControlTableArray = [];
	var pLogArray = [];
	var pDocumentBackground = [];
	var pBenchmarksArray = [];
	var pVulnerabilityArray = [];
	var pDataArray = [];
	var pSummaryArray = [];
	var pBodyArray = [];
	var partefactArray = [];

	function quote ( line ){return ( '\'' + line + '\'' );}

	function add_control_row (parameter_name, parameter_value) {
    pControlTableArray.push([parameter_name, parameter_value]);
  }

  function add_data_row () {
    //pDataArray.push([sp1, sp2, sp3, sp4, sp5]);
   var tArray = [];
   for (let i = 0; i < arguments.length; i++) {
    tArray.push(arguments[i]);
    }
    pDataArray.push(tArray);
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

  function cat(parameter_name, parameter_value) {
    partefactArray.push([parameter_name, parameter_value]);
  }

  function publish_artefact(parameter_name, parameter_value) {
    partefactArray.push([parameter_name, parameter_value]);
  }

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
      console.log(input);
      strWIP += "<tr>";
      iTotalCols = input.length;
      for (idx = 0 ; idx < iTotalCols; idx++){
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

			  for (jdx= 0 ; jdx < iTotalCols; jdx++){

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

	function write_data_table_rows () {

		var idx = 0;
		var strWIP = "";

    var iTotalRows = pDataArray.length;
    var iTotalCols;

    for (const input of pDataArray) {
      console.log(input);
      strWIP += "<tr>";
      iTotalCols = input.length;
      for (idx = 0 ; idx < iTotalCols; idx++){
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

  function write_artefacts () {
 		const parameterName = 0;
		const parameterValue = 1;

    var idx;
    var strWIP;
    var strpName;
    var strpValue;

    strWIP = "";

		for (idx = 0; idx < partefactArray.length; idx++) {

      strpName = partefactArray[idx][parameterName];
      strpValue = partefactArray[idx][parameterValue];

      switch( strpName ) {
        case "h1":
          strWIP = strWIP + html_h1(strpValue);
          break;
        case "i":
          strWIP = strWIP + html_image(strpValue);
          break;
        case "p":
          strWIP = strWIP + html_p(strpValue);
          break;
        case "t":
          strWIP = strWIP + html_bold_red(strpValue);
          break;
        default:
          // code block
      }

		}

    document.getElementById("TheDocument").innerHTML = strWIP;
    strWIP = "";

  }

  function html_image(str){
    //return  "<p>&nbsp</p><img src=" + quote(str) + " width=" + quote("600") + " height=" + quote("600") + "></img>"
    //return  "<p>&nbsp</p><img src=" + quote(str) + " " + quote("style=width:500px;height:600px;") + "></img>"
    return  "<br><img src=" + quote(str) + " " + quote("style=width:500px;height:600px;") + "></img><br>"
  }

  function html_h1(str){
    var strTemp;
    strTemp = str.replace(/ /gi,"_");
    return  "<h1 id=" + quote(strTemp) + ">" + str + "</h1>";
  }

  function html_th(str){
    return  "<th scope='col'>" + str + "</th>";
  }

  function html_td(str){
    return  "<td>" + str + "</td>";
  }

  function html_p(str){
    return  "<p>" + str + "</p>";
  }

  function html_bold_red(str){
    return "<b class='_f-danger'>" + str + "</b>";
  }

  function html_bold(str){
    return "<b class='_f-danger'>" + str + "</b>";
  }

  function zzz_get_sku_title(strSKU){
  //Grunt iteration over pBenchmarksArray to find the SKU title string.

		const parameterSKU = 1;
		const parameterTitle = 4;

		var idx;
		var strWIP;

      strWIP = "SKU not found";

			for (idx = 0; idx < pBenchmarksArray.length; idx++) {
			  if (pBenchmarksArray[idx][parameterSKU] === strSKU) {
			    strWIP = pBenchmarksArray[idx][parameterTitle];
			    break;
			  }
			}


    return strWIP
  }

  function clean_up() {
    pLogArray.length = 0;
   	ppArray.length = 0;
  	pControlTableArray.length = 0;
  	pBenchmarksArray.length = 0;
  	pSummaryArray.length = 0;
  	pBodyArray.length = 0;
  	partefactArray.length = 0;
  }


