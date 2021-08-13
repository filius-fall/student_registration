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


            
        
            <b-button v-b-modal.modal-prevent-closing>Add Students</b-button>
        
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