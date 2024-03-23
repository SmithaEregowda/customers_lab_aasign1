export  function AddSchema(requestOptions) {
    const data =fetch(`https://webhook.site/1d5866cb-9750-4dbc-8217-c046c739a02d`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }