var typeSort = "select";
$('#eData').slideUp();
$('#fileInput').slideUp();

$(document).ready(function () {
    let arrayData = [];
    /**Якщо обирає користувач використати дані з файлу показати "обрати файл" та приховати  поле вводу*/
    $('#fileSort').click(function () {
        $('#fileInput').slideDown(500);
        $('#eData').slideUp(500);

    // Add the following code if you want the name of the file appear on select
    $(".custom-file-input").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });

        let input = document.getElementById('customFile'); 
        input.addEventListener('change', function () {
            readXlsxFile(input.files[0]).then(function (data) {
                data.forEach(element => {
                    arrayData.push(element[0]);
                });
            });        
        });
        
    });

    /**Якщо обирає користувач ввести дані вручну показати поле вводу та приховати "обрати файл" */
    $('#enteredSort').click(function () {
        $('#eData').slideDown(500);
        $('#fileInput').slideUp(500);
        $("#eData").change(function () {
            let data = $("#eData").val();
            arrayData = data.split(",");
        });
    });

    $("#btnSort").click (function () {
        switch (typeSort) {
            case 'select':
                $("#rData").val(selectSort(arrayData));
                break;
            case 'insert':
                $("#rData").val(insertSort(arrayData));
                break;
            case 'bubble':
                $("#rData").val(bubbleSort(arrayData));
                break;
            case 'quick':
                $("#rData").val(quickSort(arrayData));
                break;
            case 'merge':
                $("#rData").val(mergeSort(arrayData));
                break;
        }
    });
})

/**
 * Робить активною ту вкладку, 
 * яку обрав користувач та передає який метод сортування він обрав
 * @param {*} event отримує об'єкт-посилання який натиснув користувач
 */
function myFunction(event) {
    let list = $(".nav-link");
    list.removeClass("active");
    typeSort = event.target.dataset.sort;
    $(`#${typeSort}Sort a`).addClass("active");
}

/**
 * Функція для алгоритму сортування вибором
 * @param {*} data  отримує масив даних, які потрібно відсортувати
 * @returns array відсортований масив
 */
function selectSort(data) {
    for (let i = 0; i < data.length; i++) {
        let less = data[i];
        let index = i;
        for (let y = i; y < data.length; y++) {
            if (data[y] < less) {
                less = data[y];
                index = y;
            }
        }
        data[index] = data[i];
        data[i] = less;
    }

    return data;
}


function bubbleSort(data) {
    let index = 0;
    for (let i = 0; i < data.length; i++) {
        let tmp;
        if (data[i] > data[i + 1]) {
            tmp = data[i];
            data[i] = data[i + 1];
            data[i + 1] = tmp;
            index++;
        }   
    }
    if (index > 0) {
        bubbleSort(data);
    }
    return data;
}


function insertSort(data) {
    for (let k = 1; k < data.length; k++) {
        let i = k - 1;
        let tmp = data[k];
        while (data[i] > tmp && i >= 0) {
            data[i + 1] = data[i];
            i--;
        }
        data[i+1] = tmp;
    }
    return data;
}

function mergeSort(data) {
    let len = data.length;

    /**
     * розділяємо на пополом вхідний масив для подальшого сортування
     */
    let tmpArray1 = [],
        tmpArray2 = [];
    if (len == 1) {
        return data;
    } else if (len > 1) {
        let middle = Math.floor(len / 2);
        for (let i = 0; i < middle; i++) {
            tmpArray1.push(data[i]);
        }
        for (let i = middle; i < len; i++) {
            tmpArray2.push(data[i]);
        }
        tmpArray1 = mergeSort(tmpArray1);
        tmpArray2 = mergeSort(tmpArray2);
    }

    /**
     * робимо злиття двох відсортованих масивів
     */
    let sortArray = [];
    let i = 0,
        j = 0;
    for (let k = 0; k < tmpArray1.length + tmpArray2.length; k++){
        if (i >= tmpArray1.length) {
            sortArray[k] = tmpArray2[j];
            j++;
        } else if (j >= tmpArray2.length) {
            sortArray[k] = tmpArray1[i];
            i++;
        } else {
            if (tmpArray1[i] < tmpArray2[j]) {
                sortArray[k] = tmpArray1[i];
                i++;
            } else if (tmpArray1[i] > tmpArray2[j]) {
                sortArray[k] = tmpArray2[j];
                j++;
            }
        }
    }
    console.log("merge");
    return sortArray;
}

function quickSort(data, start = 0, end = data.length - 1) {
    let i = start -1,
        j = start,
        pivot = data[end],
        tmp = 0;
    //порівнюємо елементи масиву з опорним елементом останнім в масиві pivot
    for (j; j < end; j++) {
        if (data[j] > pivot) {
        } else if (data[j] < pivot) {
            i++;
            tmp = data[i];
            data[i] = data[j];
            data[j] = tmp;
        }
    }
    //встановлюємо опорний елемент на відсортоване місце (зліва менші невідсортовані числа, зправа - більші невідсортовані)
    i++;
    tmp = data[i];
    data[i] = pivot;
    data[end] = tmp;

    //якщо ліва і права частина масиву має більше 1 елементу відповідно, то викликаємо рекурсію функції
    if (start < i - 1) {
        quickSort(data, 0, i - 1);
    }
    if (i + 1 < j) {
        quickSort(data, i + 1, j);
    }
    console.log("quick");
    return data;
}