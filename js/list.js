
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
                currentSort:'name',
                currentSortDir:'asc',
                amountList : '',
                dateList:'',
                CurrentPage:1,
                PageSize:3
    
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
        sorts(s){
            if(s===this.currentSort){
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
            }
            this.currentSort = s;
        },
        populateStudents(){
            studentDB.getItem('details').then((data)=>{
                if(data){
                    console.log(data)
                    console.log(typeof(data))
                    this.studentsList = JSON.parse(data);
                    console.log(this.studentsList)
                }
                else{


                    var j = {'name':'test','amount':'500','joindate':'10-Jan-2021','totalclasses':'50','id':'0','currentclasses':'0'}

                    this.studentsList = j


                }
                
            })    
        },
        edit_details(val,in_val){
            console.log('DETAILS EDITED',val);
            this.new_entry = val['id'];
        },
        settingDetails(){
            studentDB.length().then( (value)=> {
                if(value === 0){
                    var details = [];
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
            console.log(data);
            this.studentsList.splice(index,1);
            this.studentsList.push(data);
            const jfmt = JSON.stringify(this.studentsList)
            studentDB.setItem('details',jfmt);

        },
        EditFormSubmit(){
            console.log('Form ENDED')
        },
        NextPage(){
            if((this.CurrentPage * this.PageSize) < this.studentsList.length) this.CurrentPage++;
        },
        PrevPage(){
            if(this.CurrentPage > 1) this.CurrentPage--;
        },
        inc_classes(d,e){
            
            d.currentClasses += 1;
            this.EditSubmit(d,e);
            console.log("INCREMENT");
        },
        dec_classes(d,e){
            if (d.currentClasses === 0){
                console.log('DEAD END');
                return
            }
            else{

                d.currentClasses -= 1;
                this.EditSubmit(d,e);
                console.log('DECREMENT')
            }
            
        }
    
    },
    computed:{
        sortedList:function() {

            localforage.getItem('details').then(function(value){
                console.log(value)
                if (!value){
                    return [{"name":"test","id":"0","amount":"500","joindate":"10","totalclasses":'11',"currentclasses":'0'}]
                }
                else{
                    return this.studentsList.sort((a,b) => {
                        let modifier = 1;
                        if(this.currentSortDir === 'desc') modifier = -1;
                        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                        return 0;
                      }).filter((row,index) => {
                          let start = (this.CurrentPage-1) * this.PageSize;
                          let end = (this.CurrentPage) * this.PageSize;
                          if((index >= start) && (index < end)) return true;
                      });
                }
              }).catch(function(err){
                console.log(err)

              
              })
          
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
                                <table class="tablecss table">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col" v-for="keys,values in studentHeader" @click="sorts(values)"><p>{{ keys }}</p></th>
                                    </tr>
                                    
                                </thead>

                                
                                
                                
                                <tbody>
                                    <tr class="searchRowBorder">
                                        <th>
                                            <p>
                                                <label for="searchList">Search :</label><input v-model="searchList">
                                            </p>
                                        </th>
                                        <th>
                                            <p>
                                                <label for="amountList">Search :</label><input v-model="amountList">
                                            </p>
                                        </th>
                                        <th>
                                        <p>
                                            <label for="dateList">Search :</label><input v-model="dateList">
                                        </p>
                                    </th>
                                    </tr>
                                    <tr v-for="data,index in studentsList" v-if="studentsList[index]['name'] == searchList || studentsList[index]['amount'] == amountList || studentsList[index]['joindate'] == dateList">
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
                            <table class="table modTable">
                            <thead class="thead-dark">
                                <tr>
                                    <th class="modTable_th">Current Classes</th>
                                </tr>

                            </thead>
                                <tr class="modify_tr">
                                    <th>
                                        <p>
                                            <label>Search :</label>
                                            <input>
                                        </p>
                                    </th>
                                </tr>

                                <tr v-for="data,index in studentsList" v-if="searchList == ''">

                                    <td>
                                        <div class="td-container">
                                            <div class="td-items">

                                                    <b-button class="icon-edit" variant="light" v-b-modal.edit-modal @click="edit_details(data,index)" ></b-button>
                                                    <b-modal id="edit-modal" v-if="data['id'] === new_entry" hide-footer>




                                                            <form method="post"  @submit.stop.prevent="EditFormSubmit" action="JavaScript:void(0)">


                                                                    <label for="data.name">Name: </label>
                                                                    <input v-model="data.name" required/>

                                                                    <label for="data.joindate"> Date of Join: </label>
                                                                    <input v-model="data.joindate" required/>

                                                                    <label for="data.amount"> Fee: </label>
                                                                    <input v-model="data.amount" required/>


                                                                    <input class="isubmit" type="submit" @click="EditSubmit(data,index)">

                                                            </form>

                                                    </b-modal>


                                                <b-button class="icon-trash" variant="light" @click="delDetails(data,index)"></b-button>
                                                
                                            </div>


                                            

                                            <div class="td-items">
                                                <b-button class="icon-plus" variant="light" @click="inc_classes(data,index)"></b-button>
                                                <input size="2" v-model="data.currentClasses">
                                                
                                                <b-button class="icon-minus" variant="light" @click="dec_classes(data,index)"></b-button>

                                            
                                            </div>
                                            
                                            

                                            

                        

                                        </div>

                                        



                                    </td>
                                </tr>



                            </table>
                        </div>




                    </div>

                    <p class="td-container">
                    <b-button variant="light" class="icon-arrow-left pagination td-items" @click="PrevPage"></b-button> 
                    <b-button variant="light" class="pagination td-items icon-arrow-right" @click="NextPage"></b-button>
                </p>

                </template>


            </div>
        </div>
    `,
}