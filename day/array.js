let arr = ['1','2','3','4']
let arr2 = ['9']
// let arr3 = arr.concat(arr2)
// console.log(arr3);

// var a=arr.pop();
// console.log(a);

// var a3=arr.splice(1,1,"月色真美")
// console.log(a3)
// console.log(arr)

// var a5=arr.join("-");
// console.log(a5);
// console.log(arr);

// var a6=arr.push("789");    //在数组的最后面添加一个数据，返回值为数组最终的长度。
//            console.log(a6);
//            console.log(arr);
          // var a7=arr.unshift("冰菓");     //在数组的最开始添加一个数据，返回值为数据的最终长度。
          // console.log(a7);
          // console.log(arr);
          //   var a8=arr.reverse();       //将数组的元素倒序排列，返回值为倒序后的数组,原数组也被倒叙。
          //  console.log(a8);
          //  console.log(arr);
            // console.log(arr.valueOf());       //一般的数组的valueof和tostring方法为打印数组的内容。
            // console.log(arr.toString());
            var arrsort=['q','w','f','t','h','j'];
          //  console.log(arrsort);
          //   var arrsorted=arrsort.sort();
          //  console.log(arrsorted);
          //  console.log(arrsort);
// let arr = ['1','2','3','4']
// function sum(num){
//   return num * 5
// }
// let a8 = arr.map(sum)
// console.log(a8);
// let arra = ['a','b','c','d'];
// arra.entries();
// console.log();
// var ages = [32, 33, 16, 40];
// function checkAdult(age) {
//     return age >= 18;
// }

//     let flag = ages.filter(checkAdult);
//     console.log(flag)
// var setObj = new Set(["a", "b", "c"]);
// var objArr = Array.from(setObj);
// objArr[1] == "b"; 
// console.log(objArr[1] == "b");
// console.log(objArr);
// var fruits = ["Banana", "Orange", "Apple", "Mango"];
// fruits.keys();
// console.log(fruits.keys());
// console.log(fruits);
var ages = [32, 33, 16, 40];
function getSum(total, num) {
  return total + num;
}
let sum = ages.reduce(getSum);
console.log(sum);