const Twitter = require('twitter')
const express = require('express')
const router = express.Router()

var client = new Twitter({
    consumer_key:'DS76UEyRcUraMSyHX2F1ehrhr',
    consumer_secret:'g1pvfLkTy1aVpKjrRFEKgfUH5UtVLCRh2fub4szaIKedJpT5P3',
    access_token_key:'1685795880-tsMLfcNtcC2oIJFp7R3Rdt5Y3D8wRQijAtIHVdF',
    access_token_secret:'Vy9cMWuM8cjnvtXIMoQP6JIvCGSfANJyn6S9bqpOAe47T'
});

router.get("/:count",function(req,res){
    
    var params = {count:req.params.count}

    client.get('statuses/user_timeline',params,(err,tweets,response)=>{
        if(!err) {
            res.send({data:tweets,response})
        } else {
            res.send({err})
        }
    })
})

module.exports = router;




