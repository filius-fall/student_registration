Vue.component('search-compo',{
    template:`
            <div>
                <p> <label for='searchList'>Search: </label> <input :value="searchList" @keyup.enter="$emit('update:searchList', $event.target.value)"/></p>
    
            </div>`,

    props: ['searchList']
});