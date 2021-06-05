
let db;
let budgetVersion
const request = indexedDB.open('BudgetDB', budgetVersion || 1);

function checkDatabase(){
    let transaction = db.transaction(['BudgetStore'],'readwrite')

    let store = transaction.objectStore('BudgetStore')

    let returnAll = store.getAll()

    returnAll.onsuccess= function(){
        if(returnAll.result.length>0){
            fetch('api/transaction/bulk',{
                method:'POST',
                body: JSON.stringify(returnAll.result),
                headers: {
                    Accept: 'application/json, text/plain,*/*','Content-Type':'application/json'
                }
            }).then((response)=>
                response.json())
            .then((response)=>{
                if (response.length !== 0){
                    transaction =db.transaction(["BudgetStore"],'readwrite')
                let store = transaction.objectStore('BudgetStore')
            store.clear()
            console.log('Hold tight while we clear your stored transactions')    
            
            }
            })
        }
    }
}
request.onupgradeneeded = function (e) {
    const {oldVersion} = e;
    const newVersion = e.newVersion || db.version;
console.log(`DB updated from version${oldVersion} to ${newVersion}`)
    db = e.target.result
    db.objectStore("BudgetStore",{autoIncrement: true})

}

request.onsuccess = function(e){
    db = e.target.result
    if(navigator.onLine){
        checkDatabase()
    }
}
request.onerror = function(e){
    console.log(`Looks like we have run into an error! ${target.errorCode}`)
}

const saveRecord = (record)=>{
    let transaction = db.transaction(["BudgetStore"],"readwrite");
    let store = transaction.objectStore("BudgetStore")
    store.add(record)
}

window.addEventListener('online',checkDatabase)