Vue.component('add-compo',{
    mounted () {
        console.log('add.js mounted');
        studentDB.getItem('details').then(value => {
            console.log(value);
            this.dbvalue = JSON.parse(value);
            console.log(this.dbvalue)
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
            console.log('inside additmes');
            var myDict = {};

            myDict['name'] = this.record.name;
            myDict['amount'] = this.record.amount;
            myDict['joindate'] = this.record.joindate;
            myDict['totalclasses'] = this.record.totalclasses;

            console.log(myDict);
            alert("student details are registered");

            this.dbvalue.push(myDict);
            console.log(this.dbvalue);

            const jsonformat = JSON.stringify(this.dbvalue);
            studentDB.setItem('details',jsonformat).then(() => {
                console.log('Storage is Set!!!!');
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
            console.log("SUBMITTED");
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing');
            })
        },
        FormSubmit(){
            // this.$refs.form.$el.submit();
            if(this.record.name == ""){
                console.log('error')
                return
            }

            console.log('Form submitted');
            this.$bvModal.hide('modal-prevent-closing');
            console.log(this.record.name.length)
        }
    },


    template: `
            <div> 


            
        
            <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button>
        
            <b-modal id="modal-prevent-closing" ref="modal" title="Details" @show="resetModal" @hidden="resetModal" hide-footer>
                



                    <form method="post"  @submit.stop.prevent="FormSubmit" ref="form" action="JavaScript:void(0)">


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
                                <label for="record.totalClasses">totalClasses: </label>
                                <input v-model="record.totalClasses" required/>
                            </div>
                        </div>

                        
                        <input class="isubmit" type="submit"></input>

                    </form>
                
                
                
            </b-modal>







            </div>`
})