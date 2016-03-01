function Test(req,res){

    res.send(req.query);

    //Backgrounds.findAll({
    //    include: [
    //        { model: Answers, where: { settings: {$in: [2,3,4]}} }
    //    ]
    //}).then(function(result){
    //    res.send(result);
    //});
    //
    //res.send("hello");
    //
    //
    //Topics.findAll({
    //    where: {description: req.params.topic },
    //    include: [ {model: Questions, as: 'topicsAndQuestions'} ]
    //}).then(function(result){
    //    res.send(result);
    //});
    //
    //Topics.findAll({
    //    where: { description: req.params.topic},
    //    raw: true,
    //    attributes: [ ],
    //    group: 'Topics.background',
    //    include: [
    //        {
    //            model: Topics, as: 'Subtopics',
    //            attributes: [[ sequelize.fn('COUNT', 'id'), 'count' ]]
    //        },
    //        {
    //            model: Questions,
    //            as: 'topicsAndQuestions',
    //            attributes: [[ sequelize.fn('COUNT', 'id'), 'count' ]]
    //        }
    //    ]
    //}).then(function(result){
    //    res.send(result);
    //});
    //
    //console.log(req.params.county);
    //Districts.findAll({
    //
    //
    //}).then(function(result){
    //    res.send(result);
    //})
    //
    //Politicians.findAll({
    //    include: { model: Users, required:true }
    //}).then(function(result){
    //    res.send(result);
    //});
    //Answers.findAll({
    //    include: { model: Backgrounds }
    //}).then(function(result){
    //   res.send(result);
    //});

};

module.exports = {
    Test: Test
};