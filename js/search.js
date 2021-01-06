Vue.component('search-compo',{
    template:`
            <div>
                <p> Search: <input :value="searchList" @keyup.enter="$emit('update:searchList', $event.target.value)"/></p>
    
            </div>`,

    props: ['searchList']
});