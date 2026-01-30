const asyncHandle = (fn) =>{
    (req ,res , next )
    .resolve(fn(req , res , next ))
    .catch((err) =>{
        console.log("error ", err) 
    })
}


export {asyncHandle}

// const asyncHandle = (fn) => async () =>{
// try {
//     await fn(req , res , next )
    
// } catch (error) {
//     resizeBy.status(error.code || 500 ).json({
//         success : false,
//         message : error.message
//     })
// }
// }