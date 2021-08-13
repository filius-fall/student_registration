

  
  // let addComp = {
  //   mounted(){
  //       console.log('addjs mounted')
  //   },
  //   template: '<p>PlanPickerComponent</p>',
  //   data() {
  //     return {
  //       plans: ['The Single', 'The Curious', 'The Addict']
  //     }
  //   }
  // }
  
  const studentDB = localforage.createInstance({
    name        : 'studenstList',
    storeName   : 'students',
});

var j = {'name':'test','amount':'500','joindate':'10-Jan-2021','totalclasses':'50','id':'0','currentclasses':'0'}
var k = JSON.stringify([j])
studentDB.setItem('details',k)

console.log("added values 22222222");
  
  new Vue({
    el: '#app',
    // data:{
    //     name1:'sreeram',
    //     name:'',
    //     studentName:'',
    //     stuName:'',
    // },
    components: {
      'list-view': listView
    },
    template:
            `<div>
                <list-view ></list-view>
            </div>`

  });



  window.addEventListener('load',()=>{
    registerSW();
});

async function registerSW(){
    if('serviceWorker' in navigator){
        try{
            await navigator.serviceWorker.register('./sw.js');
        }
        catch(e){
            console.log('Service registration failed: ',e);
        }
    }
};