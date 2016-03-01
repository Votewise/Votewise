function createShortInputAnswer(req, res){

    Answers.create(req.body).then(function(result){
        res.send(result);
    })

};

function updateShortInputAnswer(req,res) {
    models.answers.upsert(req.body).then(function (result) {
        res.send(result);
    })
};


module.exports = {
    createShortInputAnswer: createShortInputAnswer,
    updateShortInputAnswer: updateShortInputAnswer
};