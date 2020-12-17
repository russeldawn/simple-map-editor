var height = O('input-height');
var width = O('input-width');
var submit = O('submit-display-size');
var exportMap = O('export-map');
var canvas = O('map-editor');
var tree = C('tree-image')[0];
var barrel = C('barrel-image')[0];
var grass = C('grass-image')[0];
var pickedAsset = '';
var pickedFlag = '';
var field2 = O('field2');



function O(i) {
    return typeof i == 'object' ? i : document.getElementById(i);
}

function querySelectorAll(i) {
    return typeof i == 'object' ? i : document.querySelectorAll(i);
}

function S(i) {
    return O(i).style;
}

function C(i) {
    return document.getElementsByClassName(i);
}



tree.addEventListener('click', function (e) {
    pickedAsset = tree;
    pickedFlag = 'tree';
});

barrel.addEventListener('click', function (e) {
    pickedAsset = barrel;
    pickedFlag = 'barrel';
});

grass.addEventListener('click', function (e) {
    pickedAsset = grass;
    pickedFlag = 'grass';
});


submit.addEventListener('click', function (e) {

    if ((height.value == '' || height.value == 0) && (width.value == '' || width.value == 0)) {
        alert('Please put value on the input fields.');
    } else if ((height.value == '' || height.value == 0) || (width.value == '' || width.value == 0)) {
        if (height.value == '' || height.value == 0) {
            alert('Height cannot be empty or zero.');
        }

        if (width.value == '' || width.value == 0) {
            alert('Width cannot be empty or zero.');
        }
    } else {

        var child = '';
        var newCell = '';


        for (var index1 = 0; index1 < height.value; index1++) {

            var row = field2.insertRow(-1);

            for (var index2 = 0; index2 < width.value; index2++) {
                console.log('index2: ', index2);
                newCell = row.insertCell(index2);
                newCell.classList.add('sand-image');

                child = document.createElement('div');
                child.classList.add('grass-image');

                newCell.appendChild(child);
                row.appendChild(newCell);

                child.setAttribute('id', 'item' + index1 + 'of' + index2);

            }

        }

        insertAsset();

    }

});

exportMap.addEventListener('click', function (e) {
    console.log(JSON.stringify(tableToJson(O('field2'))));
});

function insertAsset() {

    var fieldDiv = '';

    var queryField2 = querySelectorAll('#field2 td div');
    for (var index3 = 0; index3 < queryField2.length; index3++) {
        fieldDiv = queryField2[index3];
        var newDiv = '';

        queryField2[index3].addEventListener('click', function (e) {

            if (pickedAsset != '') {
                switch (pickedFlag) {
                    case 'tree':
                        newDiv = document.createElement('div');
                        newDiv.classList.add('tree-image');
                        break;

                    case 'barrel':
                        newDiv = document.createElement('div');
                        newDiv.classList.add('barrel-image');
                        break;

                    case 'grass':
                        newDiv = document.createElement('div');
                        newDiv.classList.add('grass-image');
                        break;
                }

                e.target.appendChild(newDiv);
            } else {

            }
        });
    }

}

function tableToJson(table) {
    var data = [];
    for (var i=1; i<table.rows.length; i++) {
        var tableRow = table.rows[i];
        var rowData = [];
        for (var j=0; j<tableRow.cells.length; j++) {
            rowData.push(tableRow.cells[j].innerHTML);
        }
        data.push(rowData);
    }
    return data;
}

insertAsset();