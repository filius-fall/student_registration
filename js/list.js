
let listView = {
    data(){
        return {
                studentsList : [],
                studentHeader : {
                    'name' : 'Student Name',
                    'amount' : 'Fee',
                    'joindate' : 'Date of Join',
                },
                searchList : '',
                addList : [],
                new_entry: '',
                t:'name'
        }
    },
    mounted(){
        console.log('list mounted'),
        console.log(this.studentHeader['name']);
        
        // studentDB.setItem('details',JSON.stringify([studentInfo]));

    },
    created(){
        this.populateStudents();
        this.settingDetails();
        this.$root.$on('Add::Student',(value)=>{
            console.log('Emit recieved'); 
            this.populateStudents();
            
        });

    },

    methods : {
        populateStudents(){
            studentDB.getItem('details').then((data)=>{
                this.studentsList = JSON.parse(data);
                
            })    
        },
        edit_details(val){
            console.log('DETAILS EDITED',val);
            this.new_entry = val['name'];
        },
        settingDetails(){
            studentDB.length().then( (value)=> {
                if(value === 0){
                    var details = {};
                    let jsonformat = JSON.stringify(details)
                    console.log('NOTHING IN HERE');
                    studentDB.setItem('details',jsonformat).then(()=>{
                        console.log('DETAILS IS SET');
                        console.log(jsonformat)
                    })
                }
            })
        },
        delDetails(a,b){
            console.log(a,b);
            console.log(this.studentsList[b]);
            this.studentsList.splice(b,1);
            const jform = JSON.stringify(this.studentsList);
            studentDB.setItem('details',jform);
        },
        EditSubmit(data,index){
            console.log(this.studentsList[index]['name'])
        }
    
    },
    props:['values'],
    template: `
        <div>
            <nav class="navbar navbar-dark bg-primary">
                <div class="center">
                    <center>
                        Music Class
                    </center>
                </div>
            </nav>
            <div class="spa">
            <search-compo :searchList.sync="searchList"></search-compo>
            <add-compo></add-compo>
            
            </div>
            <div class="container custom">
                <template v-if="studentsList == null">
                    <center>
                        No Students available
                    </center>
                </template>
                
                <template v-else>


                    <div class="tables-container">
                        <div class="detail">
                                <table class="table">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col" v-for="keys,values in studentHeader"><p>{{ keys }}</p></th>
                                    </tr>
                                </thead>
                                
                                
                                
                                <tbody>
                                    <tr v-for="data,index in studentsList" v-if="studentsList[index]['name'] == searchList">
                                        <td v-for="keys,values in studentHeader"><p>{{ data[values] }}</p></td>
                                    </tr>

                                    <tr v-for="data,index in studentsList" v-if="searchList == ''">
                                        <td v-for="keys,values in studentHeader">
                                            <p>{{ data[values] }}</p>
                                        </td>
                                    </tr>
                                </tbody>

                                
                                
                            </table>



                        </div>
                        <div class="detail">
                            <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Modify</th>
                                </tr>
                            </thead>

                                <tr v-for="data,index in studentsList" v-if="searchList == ''">
                                    <td>
                                        <div class="td-container">
                                            <div class="td-items">
                                                <b-button v-b-modal.edit-modal @click="edit_details(data)" >Edit {{ data['name'] }}</b-button>
                                                <b-modal id="edit-modal" v-if="data['name'] === new_entry" hide-footer>
                                                        <p>Hello {{ new_entry }}</p>
                                                        <input v-model="data.name" >



                                                        <form method="post" action="JavaScript:void(0)" @submit.prevent.default="EditSubmit(data,index)">


                                                                <label for="data.name">Name: </label>
                                                                <input v-model="data.name" required/>


                                                                <input class="isubmit" type="submit" @click="EditSubmit(data,index)">

                                                        </form>

                                                </b-modal>
                                                <br>

                                            </div>

                                            <div class="td-items">
                                                <button @click="delDetails(data,index)">del</button>
                                            </div>

                                        </div>



                                    </td>
                                </tr>



                            </table>
                        </div>

                    </div>

                </template>
            </div>
        </div>
    `,
}