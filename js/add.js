





Vue.component('add-compo',{
    mounted () {
        console.log('add.js mounted');
        studentDB.getItem('details').then(value => {
            console.log(value);
            this.dbvalue = JSON.parse(value);
            console.log(this.dbvalue.length)
        })
        .catch(err => {
            console.log(err);
            
        })
       
    },
    data () {
        return {
            record:{
                'name' : '',
                'amount' : '',
                'joindate' : '',
                'totalclasses' : '',
                'id': '',
                'currentclasses':0,
            },
            dbvalue : [],
            detailState: null,
        }
    },
    methods: {
        addStudent(){
            // if(!(this.record.name && this.record.amount)){
            //     alert('All Fields must be filled')
                
            //     console.log('empty return');
            //     return;
            // }
            // console.log('inside additmes');
            var myDict = {};

            myDict['name'] = this.record.name;
            myDict['amount'] = this.record.amount;
            myDict['joindate'] = this.record.joindate;
            myDict['totalclasses'] = this.record.totalclasses;
            myDict['id'] = this.dbvalue.length;
            myDict['currentClasses'] = this.record.currentclasses;

           // console.log(myDict);
            alert("student details are registered");
           // console.log(this.record);

            if(myDict['name'] === ""){
                this.dbvalue = [];
                console.log('INSIDE IF DICTNAME')
                return;
            }
            // if(this.dbvalue === null){
            //     this.dbvalue = [];
            //     console.log('INSIDE DB')

            // }
            this.dbvalue.push(myDict);
            // console.log("afet if",this.dbvalue);

            const jsonformat = JSON.stringify(this.dbvalue);
            studentDB.setItem('details',jsonformat).then(() => {
                // console.log('Storage is Set!!!!');
                this.$root.$emit('Add::Student',jsonformat);
                this.$root.$emit('exit',true);
            })

        },
        checkFormValidity(){
            const valid = this.$refs.form.checkValidity();
            this.detailState = valid;
            return valid
        },

        handleOk(bvEvent){
            bvEvent.preventDefault();

            this.handleSubmit()
        },
        handleSubmit(){
            if(!this.checkFormValidity()){
                return
            }
            // console.log("SUBMITTED");
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing');
            })
        },
        FormSubmit(){
            // this.$refs.form.$el.submit();
            if(this.record.name == ""){
                // console.log('error')
                return
            }

            console.log('Form submitted');
            this.$bvModal.hide('modal-prevent-closing');
            console.log(this.record.name.length)
        },
        resetModal() {
            this.record.name = '';
            this.record.joindate = '';
            this.record.amount = '';
            this.record.totalClasses = null;
            this.detailState = null;
            // console.log('reset Modal')
          },
          editDetails(){
            //   console.log('edited');
          }
    },


    template: `
            <div> 


            
        
            <b-button v-b-modal.modal-prevent-closing>Add Student</b-button>
        
            <b-modal id="modal-prevent-closing" ref="modal" title="Details" show="resetModal" @hidden="resetModal" hide-footer>
                



                    <form method="post"  @submit.stop.prevent="FormSubmit" ref="form"  action="JavaScript:void(0)">


                        <div class="addContainer">
                            <div class="adItems">
                                <label for="record.name">Name: </label>
                                <input v-model="record.name" required/>
                            </div>

                            <div class="adItems">
                                <label for="record.amount">Fee: </label>
                                <input v-model="record.amount" required/>
                            </div>

                            <div class="adItems">
                                <label for="record.joindate">joindate: </label>
                                <input v-model="record.joindate" required/>
                            </div>
                            
                            <div class="adItems">
                                <label for="record.totalclasses">Total Classes: </label>
                                <input v-model="record.totalclasses" required/>
                            </div>
                        </div>

                        
                        <input class="isubmit"type="submit" @click="addStudent"></input>

                    </form>
                
                
                
            </b-modal>







            </div>`
})




function loadValues(){

    
    const studentDB = localforage.createInstance({
      name        : 'studenstList',
      storeName   : 'students',
  });

  var j = {'name':'test','amount':'500','joindate':'10-Jan-2021','totalclasses':'50','id':'0','currentclasses':'0'}
  var k = JSON.stringify([j])
  studentDB.setItem('details',k)
  console.log("LOADDDDDDINIIIIIIINFFFFFFFFFFFFFFGGGGGGGGGGG VALUUUUUUUUEEEEEEESSSSSSSSSS")
}



// var state = history.state || {};
// var reloadCount = state.reloadCount || 0;
// if (performance.navigation.type === 1) { // Reload
//     state.reloadCount = ++reloadCount;
//     history.replaceState(state, null, document.URL);
// } else if (reloadCount) {
//     delete state.reloadCount;
//     reloadCount = 0;
//     history.replaceState(state, null, document.URL);
// }

// console.log(reloadCount)
// if (reloadCount <= 1) {
//     // Now, do whatever you want...
//     console("RELOAD COUNT NOT EXCEEDED")
//     loadValues()
// }



// var open = indexedDB.open("details", 1);
// open.onerror = function(event) {
//   console.log("Error loading database....................................................");
// }
// open.onsuccess = function(event) {
// //   var db = dbRequest.result;
// //   var transaction = db.transaction("Store", "readwrite");
// //   var objectStore = transaction.objectStore("Store");
// //   objectStore.put({ id: "GID", value: GID });

//     console.log("SUCCCCCCCCCCCCCCCCCCCCCCESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
//   /* ....... */
// } 


