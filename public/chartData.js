let borderCol = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255, 120, 164, 1)',
    'rgba(29, 190, 121, 1)',
    'rgba(105, 167, 9, 1)',
    'rgba(150, 199, 99, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255, 120, 164, 1)',
    'rgba(29, 190, 121, 1)',
    'rgba(105, 167, 9, 1)',
    'rgba(150, 199, 99, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255, 120, 164, 1)',
    'rgba(29, 190, 121, 1)',
    'rgba(105, 167, 9, 1)',
    'rgba(150, 199, 99, 1)'
];

let bgCol = [
    'rgba(255, 99, 132, 0.9)',
    'rgba(54, 162, 235, 0.9)',
    'rgba(255, 206, 86, 0.9)',
    'rgba(75, 192, 192, 0.9)',
    'rgba(153, 102, 255, 0.9)',
    'rgba(255, 159, 64, 0.9)',
    'rgba(255, 120, 164, 0.9)',
    'rgba(29, 190, 121, 0.9)',
    'rgba(105, 167, 9, 0.9)',
    'rgba(150, 199, 99, 0.9)',
    'rgba(255, 99, 132, 0.9)',
    'rgba(54, 162, 235, 0.9)',
    'rgba(255, 206, 86, 0.9)',
    'rgba(75, 192, 192, 0.9)',
    'rgba(153, 102, 255, 0.9)',
    'rgba(255, 159, 64, 0.9)',
    'rgba(255, 120, 164, 0.9)',
    'rgba(29, 190, 121, 0.9)',
    'rgba(105, 167, 9, 0.9)',
    'rgba(150, 199, 99, 0.9)',
    'rgba(255, 99, 132, 0.9)',
    'rgba(54, 162, 235, 0.9)',
    'rgba(255, 206, 86, 0.9)',
    'rgba(75, 192, 192, 0.9)',
    'rgba(153, 102, 255, 0.9)',
    'rgba(255, 159, 64, 0.9)',
    'rgba(255, 120, 164, 0.9)',
    'rgba(29, 190, 121, 0.9)',
    'rgba(105, 167, 9, 0.9)',
    'rgba(150, 199, 99, 0.9)'
];

let dummy1 = {
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: bgCol,
    borderColor: borderCol,
    borderWidth: 1
};
let dummy2 = {
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: bgCol,
    borderColor: borderCol,
    borderWidth: 1
};
let dummy3 = {
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: bgCol,
    borderColor: borderCol,
    borderWidth: 1
};

let dummy4 = {
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: bgCol,
    borderColor: borderCol,
    borderWidth: 1
};

let dummy5 = {
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: bgCol,
    borderColor: borderCol,
    borderWidth: 1
};

let dummy6 = {
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: bgCol,
    borderColor: borderCol,
    borderWidth: 1
};

let dummy7 = {
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: bgCol,
    borderColor: borderCol,
    borderWidth: 1
};

let dummy8 = {
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: bgCol,
    borderColor: borderCol,
    borderWidth: 1
};

let dat1 = [dummy1]
let dat2 = [dummy2];
let dat3 = [dummy3, dummy4, dummy5];
let dat4 = [dummy6, dummy7, dummy8];

function init(va, type, obj){
    var obj = new Chart(va, {
        type: type,
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: obj
        },
        options: {
            legend:{
                display: true,
                position: 'left'
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    return obj;
}

var a = document.getElementById('verdict').getContext('2d');
var b = document.getElementById('language').getContext('2d');
var c = document.getElementById('byind').getContext('2d');
var d = document.getElementById('byrat').getContext('2d');
var verdict = init(a, 'doughnut', dat1);
var language = init(b, 'doughnut', dat2);
var index = init(c, 'bar', dat3);
var rating = init(d, 'bar', dat4);

function addData(chart, label, data, ind, flag, str) {
    if(flag == 1){
      chart.data.datasets[ind].label = str
    }
    chart.data.labels = label;
    chart.data.datasets[ind].data = data;
    console.log(data);
    console.log(flag);
    console.log(chart.data.datasets[ind].data);
    chart.update();
  }