console.log("Print first");

setTimeout(function(){
    console.log("Delay for 6 second");
},6000);
console.log("Print Third");
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        let flag = false;
        if (flag) {
            resolve("Success in 2 second");
        } else {
            reject("Error 404 print after 2 second");
        }
    }, 2000);
});

const call= async() =>{
    try{
        const result=await promise;
        console.log(result);
    }
    catch (error){
        console.log(error);
    }
};
call();