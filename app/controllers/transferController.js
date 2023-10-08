const Transfer = require('../models/Transfer');
const User = require('../models/User');

exports.initiateTransfer = async(req, res) => {
  try {
    const userId = req.user.userId;
    const sender = await User.findById(userId);
    const { recipient, amount } = req.body;

    if (!sender) {
      return res.status(404).json({ message: 'Sender not found' });
    }

    // Find the recipient user object
    const recipientUser = await User.findOne({ email: recipient });
    if (!recipientUser) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    // Ensure sender has enough balance
    if (sender.account.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Update sender's balance and recipient's balance
    sender.account.balance -= amount;
    recipientUser.account.balance += amount;

    // Save changes to sender and recipient accounts
    await sender.save();
    await recipientUser.save();

    const transfer = new Transfer({
      sender: sender,
      recipient: recipientUser,
      amount: amount,
    });
    // Save the transfer record to the database
    await transfer.save();
    res.status(200).json({ message: 'Transfer successful' });
  } catch (error) {
    console.error('Error while initiating transfer:', error);
    res.status(500).json({ message: 'An error occurred during transfer' });
  }
};

exports.getAllTransfers = async (req, res) => {
  try {
    // Retrieve all transfer records from the database
    const transfers = await Transfer.find()
    res.status(200).json(transfers);
  } catch (error) {
    console.error('Error while getting transfers:', error);
    res.status(500).json({ message: 'An error occurred while fetching transfer records' });
  }
};
