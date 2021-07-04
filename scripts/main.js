var inp_as=document.getElementById('a_size'),array_size=inp_as.value;
var inp_gen=document.getElementById("a_generate");
var inp_aspeed=document.getElementById("a_speed");
var revert=document.getElementById("revert");
//var array_speed=document.getElementById('a_speed').value;

var butts_algos=document.querySelectorAll(".algos button");

var div_sizes=[];
var divs=[];
var dup_array=[];
var margin_size;
var cont=document.getElementById("array_container");
cont.style="flex-direction:row";

//Array generation and updation.

inp_gen.addEventListener("click",generate_array);
inp_as.addEventListener("input",update_array_size);
revert.addEventListener("click",unsort);

function generate_array()
{
    cont.innerHTML="";
    var numbers = "[";
    dup_array=[];
    div_sizes=[];
    for(var i=0;i<array_size;i++)
    {
        div_sizes[i]=Math.floor(Math.random() * 100 * (inp_as.max - inp_as.min) ) + 10;
        dup_array[i]=div_sizes[i];
        numbers+=div_sizes[i];
        numbers+= (i==array_size-1) ? "]" : ", ";
        divs[i]=document.createElement("div");
        cont.appendChild(divs[i]);
        margin_size=0.1;
        divs[i].style=" margin:0% " + margin_size + "%; background-color:orange; width:" + (1000/array_size-(2*margin_size)) + "%; height:" + (0.00334*div_sizes[i]) + "%;";
    }

    document.getElementById("array").innerHTML = `<br><p id='array'><b>Unsorted Array:</b> ${numbers}</p>`;
}

function update_array_size()
{
    array_size=inp_as.value;
    generate_array();
}

window.onload=update_array_size();

//Running the appropriate algorithm.
for(var i=0;i<butts_algos.length;i++)
{
    butts_algos[i].addEventListener("click",runalgo);
}


function unsort()
{
    cont.innerHTML="";
    for(var i=0;i<array_size;i++)
    {
        div_sizes[i]=dup_array[i];
        divs[i]=document.createElement("div");
        cont.appendChild(divs[i]);
        margin_size=0.1;
        divs[i].style=" margin:0% " + margin_size + "%; background-color:orange; width:" + (1000/array_size-(2*margin_size)) + "%; height:" + (0.00334*dup_array[i]) + "%;";
    }
}
// function disable_buttons()
// {
//     for(var i=0;i<butts_algos.length;i++)
//     {
//         butts_algos[i].classList=[];
//         butts_algos[i].classList.add("butt_locked");

//         butts_algos[i].disabled=true;
//         inp_as.disabled=true;
//         inp_gen.disabled=true;
//         inp_aspeed.disabled=true;
//     }
// }

function runalgo()
{
    // disable_buttons();

    this.classList.add("butt_selected");
    
    var info1 = document.getElementById("Info_Cont1");
    var info2 = document.getElementById("Info_Cont2");
    
    switch(this.innerHTML)
    {
        case "Bubble":Bubble();
                      info1.innerHTML=`<p>Time Complexity of <b>${this.innerHTML} Sort</b> :</p><br> <img src='./img/${this.innerHTML}.PNG'>`;
                      info2.innerHTML="<p>Worst and Average Case Time Complexity: O(n*n).<br><br> Worst case occurs when array is reverse sorted."+
                                      "<br><br>Best Case Time Complexity: O(n).<br><br> Best case occurs when array is already sorted."+
                                      "Auxiliary Space: O(1)"+
                                      "<br><br>Boundary Cases: Bubble sort takes minimum time (Order of n) when elements are already sorted."+
                                      "<br><br>Sorting In Place: Yes"+
                                      "<br><br>Stable: Yes";
                      break;
        case "Selection":selection();
                        info1.innerHTML=`<p>Time Complexity of <b>${this.innerHTML} Sort</b> :</p><br> <img src='./img/${this.innerHTML}.PNG'>`;
                        info2.innerHTML="<p>Time Complexity: O(n2) as there are two nested loops. <br><br>"+
                                        "Auxiliary Space: O(1) <br><br>"+
                                        "The good thing about selection sort is it never makes more than O(n) swaps and can be useful when memory write is a costly operation. <br><br>"+
                                        "Stability : Not stable. "+
                                        "<br><br>In Place : Yes, it does not require extra space.</p>";
                        break;
        case "Insertion":Insertion();
                        info1.innerHTML=`<p>Time Complexity of <b>${this.innerHTML} Sort</b> :</p><br> <img src='./img/${this.innerHTML}.PNG'>`;
                        info2.innerHTML="<p>Time Complexity: O(n^2) <br><br>"+
                                        "Auxiliary Space: O(1) <br><br>"+
                                        "Boundary Cases: Insertion sort takes maximum time to sort if elements are sorted in reverse order. And it takes minimum time (Order of n) when elements are already sorted. <br><br>"+
                                        "Algorithmic Paradigm: Incremental Approach <br><br>"+
                                        "Sorting In Place: Yes <br><br>"+
                                        "Stable: Yes <br><br>"+
                                        "Online: Yes <br><br>"+
                                        "Uses: Insertion sort is used when number of elements is small. It can also be useful when input array is almost sorted, only few elements are misplaced in complete big array. <br><br>";
                        break;
        case "Merge":Merge();
                     info1.innerHTML=`<p>Time Complexity of <b>${this.innerHTML} Sort</b> :</p><br> <img src='./img/${this.innerHTML}.PNG'>`;
                     info2.innerHTML="<p>Time Complexity: Merge Sort is a recursive algorithm and time complexity can be expressed as following recurrence relation: "+
                                     "T(n) = 2T(n/2) + θ(n) <br><br>"+
                                     "Auxiliary Space: O(n) <br><br>"+
                                     "Algorithmic Paradigm: Divide and Conquer <br><br>"+
                                     "Sorting In Place: No <br><br>"+
                                     "Stable: Yes";
                        break;
        case "Quick":Quick();
                     info1.innerHTML=`<p>Time Complexity of <b>${this.innerHTML} Sort</b> :</p><br> <img src='./img/${this.innerHTML}.PNG'>`;
                     info2.innerHTML="<p>Worst Case: The worst case occurs when the partition process always picks greatest or smallest element as pivot. <br> T(n) = T(n-1) + theta(n) <br><br>"+
                                     "Is QuickSort stable? <br>"+ 
                                     "No <br><br>"+
                                     "Is QuickSort In-place? <br>"+
                                     "As per the broad definition of in-place algorithm it qualifies as an in-place sorting algorithm as it uses extra space only for storing recursive function calls but not for manipulating the input.";
                        break;
        case "Heap":Heap();
                    info1.innerHTML=`<p>Time Complexity of <b>${this.innerHTML} Sort</b> :</p><br> <img src='./img/${this.innerHTML}.PNG'>`;
                    info2.innerHTML="<p>Heap sort is an in-place algorithm. <br><br>"+
                                    "Not stable <br><br>"+
                                    "Time Complexity: Overall time complexity of Heap Sort is O(nLogn) <br><br>"+
                                    "Applications of HeapSort :- <br><br>"+ 
                                    "1. Sort a nearly sorted (or K sorted) array. <br>"+ 
                                    "2. k largest(or smallest) elements in an array.";
                        break;
    }
    div_sizes.sort(function(a, b){return a-b});
    document.getElementById("array2").innerHTML += `<br><p><b>Sorted Array after ${this.innerHTML} sort:</b> ${div_sizes}</p>`;
}
