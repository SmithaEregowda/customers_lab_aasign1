export  function AddSchema(requestOptions) {
    const data =fetch(`/22aff83f-80a3-4a09-b79f-f5659f40ca46`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }