
let listView = {
    data(){
        return {
                studentsList : [],
                studentHeader : {
                    'name' : 'Student Name',
                    'amount' : 'Fee',
                    'joindate' : 'Date of Join',
                    'modify' : 'Modify'
                },
                searchList : '',
                addList : [],
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
        }
    
    },
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
                    <div class="detail">
                            <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col" v-for="keys,values in studentHeader"><p>{{ keys }}</p></th>
                                </tr>
                            </thead>
                            
                            
                            
                            <tbody v-for="data,index in studentsList">
                                <tr v-if="studentsList[index]['name'] == searchList">
                                    <td v-for="keys,values in studentHeader"><p>{{ data[values] }}</p></td>
                                </tr>                                
                                <tr v-if="studentsList[index]['name'] == searchList">
                                    <td v-for="keys,values in studentHeader"><p>{{ data[values] }}</p></td>
                                </tr>
                                <tr v-if="searchList == ''">
                                    <td v-for="keys,values in studentHeader">
                                        <p>{{ data[values] }}</p>
                                    </td>
                                </tr>
                            </tbody>
                            
                            
                        </table>
                    </div>
                </template>
            </div>
        </div>
    `,
}