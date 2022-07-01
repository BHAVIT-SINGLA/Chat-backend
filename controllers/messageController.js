const Message= require("../models/messageModel");
module.exports.addMessage = async (req, res, next) => {
    try {
      
      console.log(req.body);
       await Message.create({
        message:   req.body.msg ,
        users: [req.body.from, req.body.to],
        sender: req.body.from,
      }).then((data) =>
      {
        if (data) return res.json({ msg: "Message added successfully." });
        else return res.json({ msg: "Failed to add message to the database" });
      })
  
     
    } catch (ex) {
      next(ex);
    }
  };
  module.exports.getMessages = async (req, res, next) => {
    try {
        console.log(req.body);
       await Message.find({
        users: {
          $all: [req.body.from, req.body.to],
        },
      }).sort({ updatedAt: 1 }).then((messages) =>
      {
            const allcurMessage = messages.map((msg) => {
            return {
              fromSelf: msg.sender.toString() === req.body.from,
              message: msg.message,
            };
          });
          console.log(allcurMessage)
          res.json({allcurMessage});
      });
  
      
    } catch (ex) {
      next(ex);
    }
  };