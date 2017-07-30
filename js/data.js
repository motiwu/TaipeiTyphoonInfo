var api = new XMLHttpRequest();
var data = {};
var str = {};

refreshApi();
function refreshApi() {
    api.open("get", "https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json");
    api.send(null);
    api.onload = function () {
        str = JSON.parse(api.responseText);
        data = str.DataSet["diffgr:diffgram"].NewDataSet.CASE_SUMMARY;
        showSearch();
        showData();
    }
}


const searchForm = document.getElementById("searchForm");
const allDistricts = ["所有區域", "萬華區", "中正區", "大同區", "中山區", "大安區", "南港區", "文山區", "松山區", "信義區", "士林區", "北投區", "內湖區"]
var searchDistrist = "allDistrict";

function showSearch() {
    searchForm.innerHTML = "";
    let allDistrictsLength =  allDistricts.length;
    var tagChecked = "checked";

    for(let i = 0; i < allDistrictsLength; i++) {
        searchForm.innerHTML += `<input type="radio" name="CaseLocationDistrict" id="district${i}" value="${allDistricts[i]}" ${tagChecked}>
                                    <label for="district${i}">${allDistricts[i]}</label>`;
        tagChecked = "";
    }

}




const dataContainer = document.getElementById("dataContainer");
var dataTitle = "";
var dataContent = "";
var checkedDists;
var checkedDist;

const pageContainer = document.getElementById("pages");
var totalPage = 0;
var currentPage = 1;
var howShow = 10;
var arrDistData = [];

function showData() {
    dataTitle = `<ul>
                    <li class="row title">
                        <ol>
                            <li class="col">發生時間</li>
                            <li class="col">區域</li>
                            <li class="col">詳細位置</li>
                            <li class="col">事件描述</li>
                        </ol>
                    </li>`;
                //</ul>
    dataContent = "";

    checkedDists = document.getElementsByName("CaseLocationDistrict");

    howShow = document.getElementById("howShow").value;
    data = str.DataSet["diffgr:diffgram"].NewDataSet.CASE_SUMMARY;
    arrDistData = [];


    for(let i = 0; i < checkedDists.length; i++) {
        if(checkedDists[i].checked) {
            checkedDist = checkedDists[i].value;

            for(let j = 0; j < data.length; j++) {
                if(data[j].CaseLocationDistrict == checkedDist || checkedDist == "所有區域") {
                    arrDistData.push(data[j]);
                }
            }

            arrDistData = arrDistData.slice(currentPage * howShow - howShow, currentPage * howShow);
            for(let k = 0; k < arrDistData.length; k++) {
                            dataContent += `<li class="row">
                                                <ol>
                                                    <li class="col">${arrDistData[k].CaseTime}</li>
                                                    <li class="col">${arrDistData[k].CaseLocationDistrict}</li>
                                                    <li class="col">${arrDistData[k].CaseLocationDescription}</li>
                                                    <li class="col">${arrDistData[k].CaseDescription}</li>
                                                </ol>
                                            </li>`;
            }

            dataContainer.innerHTML = `${dataTitle}${dataContent}</ul>`;
        }
    }
}
