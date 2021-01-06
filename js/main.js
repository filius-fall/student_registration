

  
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

  }) 